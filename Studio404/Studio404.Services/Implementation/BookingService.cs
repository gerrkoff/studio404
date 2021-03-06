﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Studio404.Common.Enums;
using Studio404.Common.Exceptions;
using Studio404.Common.Settings;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Dto.Account;
using Studio404.Dto.Booking;
using Studio404.Dto.CostInfo;
using Studio404.Dto.Pay;
using Studio404.Dto.Schedule;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class BookingService : IBookingService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;
        private readonly INotificationService _notificationService;
        private readonly ICostEvaluationService _costEvaluationService;
        private readonly IPayService _payService;
        private readonly IDateService _dateService;

        public BookingService(IRepository<BookingEntity> bookingRepository, INotificationService notificationService,
            ICostEvaluationService costEvaluationService,
            IPayService payService, IDateService dateService)
        {
            _bookingRepository = bookingRepository;
            _notificationService = notificationService;
            _costEvaluationService = costEvaluationService;
            _payService = payService;
            _dateService = dateService;
        }

        public IEnumerable<DayWorkloadDto> GetWeekWorkload(DateTime weekStartDate)
        {
            StudioSchedule schedule = _costEvaluationService.GetSchedule();
            int scheduleStart = schedule.Start;
            int scheduleEnd = schedule.End;
            weekStartDate = weekStartDate.Date;
            DateTime weekEndDate = weekStartDate.AddDays(7);
            
            var bookings = GetBookingsForPeriod(weekStartDate, weekEndDate)
				.Select(x => new {x.From, x.To})
                .ToList();
            
            var list = new List<DayWorkloadDto>();
            for (DateTime i = weekStartDate; i < weekEndDate; i = i.AddDays(1))
            {
                var dayWorkload = new DayWorkloadDto
                {
                    Date = i,
                    FreeHours = Enumerable
                        .Range(scheduleStart, scheduleEnd - scheduleStart + 1)
                        .Select(x => i.AddHours(x))
                        .Where(x => bookings
                            .All(y => x < y.From || x >= y.To))
                        .Select(x => x.Hour)
                        .ToArray()
                };
                list.Add(dayWorkload);
            }
            return list;
        }

        public IEnumerable<DayHourDto> GetDayWorkload(DateTime date)
        {            
            StudioSchedule schedule = _costEvaluationService.GetSchedule();
            int scheduleStart = schedule.Start;
            int scheduleEnd = schedule.End;
            var dateStart = date.Date;
            var dateEnd = dateStart.AddDays(1);
            
            var bookings = GetBookingsForPeriod(dateStart, dateEnd)
                .Select(x => new {x.From, x.To})
                .ToList();

            List<DayHourDto> list = Enumerable
                .Range(scheduleStart, scheduleEnd - scheduleStart + 1)
                .Select(x => dateStart.AddHours(x))
                .Select(x => new DayHourDto
                {
                    Hour = x.Hour,
                    Available = bookings.All(y => x < y.From || x >= y.To)
                })
                .ToList();
            return list;
        }

        public int MakeBooking(MakeBookingInfoDto makeBookingInfo, CurrentUser user)
        {
            DateTime from = makeBookingInfo.GetFromDateTime();
            DateTime to = makeBookingInfo.GetToDateTime();

            if (!user.PhoneConfirmed)
                throw new ServiceException("User does not have such permissions");

            if (from < _dateService.NowUtc.Date)
            {
                throw new ServiceException($"Booking is invalid for this action \r\n ____ from less than date now. From='{from}' Date='{_dateService.NowUtc.Date}'");
            }


            if (GetBookingsForPeriod(from, to).Any())
            {
                string bookingIds = GetBookingsForPeriod(from, to).Select(x => x.Id.ToString())
                    .Aggregate((s1, s2) => s1 + "," + s2);
                throw new ServiceException($"Booking is invalid for this action \r\n ____ has bookings for period. From='{from}' To='{to}' Ids='{bookingIds}'");
            }
            
            // TODO: Implement checking schedule

            BookingCostDto bookingCost =
                _costEvaluationService.EvaluateBookingCost(from, to, makeBookingInfo.PromoCode);
            var booking = new BookingEntity
            {
                From = from,
                To = to,
                Status = BookingStatusEnum.Unpaid,
                Guid = Guid.NewGuid(),
                Cost = bookingCost.TotalCost,
                PromoCodeId = bookingCost.PromoCode?.Id,
                UserId = user.UserId
            };
            
            _bookingRepository.Save(booking);

            return booking.Id;
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

		private IQueryable<BookingEntity> GetBookingsForPeriod(DateTime from, DateTime to)
		{
			return _bookingRepository.GetAll()
				.Where(x => x.From < to &&
							x.To > from &&
							x.Status != BookingStatusEnum.Canceled &&
							x.Status != BookingStatusEnum.Special);
		}
    }
}