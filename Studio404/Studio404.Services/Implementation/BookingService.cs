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
        public BookingService()
        {
            _bookingRepository = new Repository<BookingEntity>(new List<BookingEntity>
            {
                new BookingEntity{Date = DateTime.Today, From = 12, To = 15},
                new BookingEntity{Date = DateTime.Today, From = 10, To = 11},
                new BookingEntity{Date = DateTime.Today, From = 18, To = 19},
                new BookingEntity{Date = DateTime.Today.AddDays(1), From = 10, To = 13},
                new BookingEntity{Date = DateTime.Today.AddDays(1), From = 16, To = 18},
                new BookingEntity{Date = DateTime.Today.AddDays(2), From = 10, To = 20},
                new BookingEntity{Date = DateTime.Today.AddDays(2), From = 20, To = 22},
                new BookingEntity{Date = DateTime.Today.AddDays(-1), From = 15, To = 17},
                new BookingEntity{Date = DateTime.Today.AddDays(-1), From = 20, To = 22}
            });
        }
        
        public IEnumerable<DayWorkloadDto> GetWeekWorkload(DateTime weekStartDate)
        {
            Thread.Sleep(3000);
            
            // TODO: get start & end from studio record
            const int scheduleStart = 10;
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
            Thread.Sleep(3000);
            
            // TODO: get start & end from studio record
            const int scheduleStart = 10;
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
            
        }
    }
}