using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Studio404.Common.Enums;
using Studio404.Common.Exceptions;
using Studio404.Common.Settings;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Dto.Account;
using Studio404.Dto.Booking;
using Studio404.Dto.Pay;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class BookingService : IBookingService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;
        private readonly StudioSettings _studioSettings;
        private readonly INotificationService _notificationService;
        private readonly ICostEvaluationService _costEvaluationService;
        private readonly IPayService _payService;
        private readonly IDateService _dateService;

        public BookingService(IRepository<BookingEntity> bookingRepository, IOptions<StudioSettings> studioSettings,
            INotificationService notificationService, ICostEvaluationService costEvaluationService,
            IPayService payService, IDateService dateService)
        {
            _bookingRepository = bookingRepository;
            _notificationService = notificationService;
            _costEvaluationService = costEvaluationService;
            _payService = payService;
            _dateService = dateService;
            _studioSettings = studioSettings.Value;
        }

        public IEnumerable<DayWorkloadDto> GetWeekWorkload(DateTime weekStartDate)
        {
            int scheduleStart = _studioSettings.ScheduleStart;
            int scheduleEnd = _studioSettings.ScheduleEnd;
            weekStartDate = weekStartDate.Date;
            DateTime weekEndDate = weekStartDate.AddDays(6);
            
            var bookings = _bookingRepository.GetAll()
                .Where(x => x.Date >= weekStartDate &&
                            x.Date <= weekEndDate &&
                            x.Status != BookingStatusEnum.Canceled)
                .Select(x => new {x.Date, x.From, x.To})
                .ToList();
            
            var list = new List<DayWorkloadDto>();
            for (DateTime i = weekStartDate; i <= weekEndDate; i = i.AddDays(1))
            {
                var dayWorkload = new DayWorkloadDto
                {
                    Date = i,
                    FreeHours = Enumerable
                        .Range(scheduleStart, scheduleEnd - scheduleStart + 1)
                        .Where(x => bookings
                            .Where(y => y.Date == i)
                            .All(y => x < y.From || x > y.To))
                        .ToArray()
                };
                list.Add(dayWorkload);
            }
            return list;
        }

        public IEnumerable<DayHourDto> GetDayWorkload(DateTime date)
        {            
            int scheduleStart = _studioSettings.ScheduleStart;
            int scheduleEnd = _studioSettings.ScheduleEnd;
            date = date.Date;
            
            var bookings = _bookingRepository.GetAll()
                .Where(x => x.Date == date &&
                            x.Status != BookingStatusEnum.Canceled)
                .Select(x => new {x.From, x.To})
                .ToList();

            List<DayHourDto> list = Enumerable
                .Range(scheduleStart, scheduleEnd - scheduleStart + 1)
                .Select(x => new DayHourDto
                {
                    Hour = x,
                    Available = bookings.All(y => x < y.From || x > y.To)
                })
                .ToList();
            return list;
        }

        public void MakeBooking(MakeBookingInfoDto makeBookingInfo, CurrentUser user)
        {
            // ReSharper disable PossibleInvalidOperationException
            DateTime date = makeBookingInfo.Date.Value.Date;
            int from = makeBookingInfo.From.Value;
            int to = makeBookingInfo.To.Value;
            // ReSharper restore PossibleInvalidOperationException

            if (!user.PhoneConfirmed)
                throw new ServiceException("User does not have such permissions");
            
            if(date < _dateService.NowUtc.Date)
                throw new ServiceException("Booking is invalid for this action");
            
            if (_bookingRepository.GetAll().Any(x => x.Date == date &&
                                                     x.To >= from &&
                                                     x.From <= to &&
                                                     x.Status != BookingStatusEnum.Canceled))
                throw new ServiceException("Booking is invalid for this action");
            
            _bookingRepository.Save(new BookingEntity
            {   
                Date = date,
                From = from,
                To = to,
                Status = BookingStatusEnum.Unpaid,
                Guid = Guid.NewGuid(),
                Cost = _costEvaluationService.EvaluateBookingCost(date, from, to),
                UserId = user.UserId
            });
        }

        public void CancelBooking(int id, CurrentUser user)
        {
            BookingEntity booking = _bookingRepository.GetById(id);

            ValidateBookingForAction(booking, user.UserId, x => x.Status != BookingStatusEnum.Paid && x.Status != BookingStatusEnum.Canceled);

            booking.Status = BookingStatusEnum.Canceled;
            _bookingRepository.Save(booking);
        }

        public async Task<bool> ResendBookingCode(int id, CurrentUser user)
        {
            BookingEntity booking = _bookingRepository.GetById(id);

            ValidateBookingForAction(booking, user.UserId, x => x.Status == BookingStatusEnum.Paid);

            return await _notificationService.SendBookingCodeAsync(booking);
        }

        public PrepareBookingPaymentDto PrepareBookingPayment(int id, CurrentUser user)
        {
            BookingEntity booking = _bookingRepository.GetById(id);

            ValidateBookingForAction(booking, user.UserId, x => x.Status == BookingStatusEnum.Unpaid);

            return _payService.PrepareBookingPaymnent(booking);
        }

        private void ValidateBookingForAction(BookingEntity booking, string userId, Func<BookingEntity, bool> bookingCheck)
        {            
            if (booking == null)
                throw new ServiceException("Booking does not exist");

            if (booking.UserId != userId)
                throw new ServiceException("User does not have such permissions");

            if (!bookingCheck(booking))
                throw new ServiceException("Booking is invalid for this action");
        }
    }
}