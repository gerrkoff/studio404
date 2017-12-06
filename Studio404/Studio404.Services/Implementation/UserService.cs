using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
            return _bookingRepository.GetAll()
                .Where(x => x.UserId == user.Id)
                .OrderBy(x => x.Date)
                .ThenBy(x => x.From)
                .ProjectTo<BookingSimpleDto>()
                .ToList();
        }
    }
}