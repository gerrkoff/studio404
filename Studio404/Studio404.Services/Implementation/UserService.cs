using System;
using System.Collections.Generic;
using System.Linq;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Dto.Booking;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;

        public UserService(IRepository<BookingEntity> bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        public IEnumerable<BookingSimpleDto> GetUserBookings(UserEntity user)
        {
            List<BookingSimpleDto> bookings = _bookingRepository.GetAll()
                .Where(x => x.UserId == user.Id)
                .Select(x => new BookingSimpleDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    From = x.From,
                    To = x.To,
                    Status = x.Code == null ? BookingStatusEnum.Unpaid : BookingStatusEnum.Paid
                })
                .ToList();
            return bookings.OrderByDescending(x => x.Date).ThenByDescending(x => x.From);
        }
    }
}