using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;
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
                .Where(x => x.Date >= weekStartDate && x.Date <= weekEndDate)
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
                .Where(x => x.Date == date)
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
            _bookingRepository.Save(new BookingEntity
            {
                Date = makeBookingInfo.Date,
                StudioId = 0,
                From = makeBookingInfo.From,
                To = makeBookingInfo.To,
                Code = 1111, // TODO: remove,
                UserId = user.Id
            });
        }
    }
}