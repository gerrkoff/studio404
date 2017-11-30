using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Dto.Booking;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class BookingService : IBookingService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;

        public BookingService(IRepository<BookingEntity> bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }
        
        public IEnumerable<DayWorkloadDto> GetWeekWorkload(DateTime weekStartDate)
        {            
            // TODO: get start & end from studio record
            const int scheduleStart = 3;
            const int scheduleEnd = 23;
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
            // TODO: get start & end from studio record
            const int scheduleStart = 3;
            const int scheduleEnd = 23;
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

        public void MakeBooking(MakeBookingInfoDto makeBookingInfo)
        {
            _bookingRepository.Save(new BookingEntity
            {
                Date = makeBookingInfo.Date,
                StudioId = 0,
                UserId = 0,
                From = makeBookingInfo.From,
                To = makeBookingInfo.To,
                Code = 1111 // TODO: remove
            });
        }
    }
}