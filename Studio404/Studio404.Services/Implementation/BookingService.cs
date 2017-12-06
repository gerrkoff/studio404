using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;
using Studio404.Common.Enums;
using Studio404.Common.Exceptions;
using Studio404.Common.Settings;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Dto.Booking;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class BookingService : IBookingService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;
        private readonly StudioSettings _studioSettings;

        public BookingService(IRepository<BookingEntity> bookingRepository, IOptions<StudioSettings> studioSettings)
        {
            _bookingRepository = bookingRepository;
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

        public void MakeBooking(MakeBookingInfoDto makeBookingInfo, UserEntity user)
        {
            // ReSharper disable PossibleInvalidOperationException
            DateTime date = makeBookingInfo.Date.Value.Date;
            int from = makeBookingInfo.From.Value;
            int to = makeBookingInfo.To.Value;
            // ReSharper restore PossibleInvalidOperationException

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
                UserId = user.Id
            });
        }

        public void CancelBooking(int id, UserEntity user)
        {
            if (!_bookingRepository.GetAll().Any(x => x.Id == id && x.UserId == user.Id))
                throw new ServiceException("User does not have such permissions");

            if (_bookingRepository.GetAll().Any(x => x.Id == id && x.Status == BookingStatusEnum.Canceled))
                throw new ServiceException("Booking is invalid for this action");

            var booking = new BookingEntity
            {
                Id = id,
                Status = BookingStatusEnum.Canceled
            };
            _bookingRepository.SaveProperties(booking, x => x.Status);
        }
    }
}