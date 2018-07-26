using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper.QueryableExtensions;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Dto.Account;
using Studio404.Dto.Booking;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly IRepositoryNonDeletable<BookingEntity> _bookingRepository;
        private readonly IDateService _dateService;

        public UserService(IRepositoryNonDeletable<BookingEntity> bookingRepository, IDateService dateService)
        {
            _bookingRepository = bookingRepository;
            _dateService = dateService;
        }

        public IEnumerable<BookingSimpleDto> GetUserBookings(CurrentUser user)
        {
            DateTime yesterday = _dateService.NowUtc.Date.AddDays(-1);
            return _bookingRepository.GetAll()
                .Where(x => x.UserId == user.UserId &&
                            x.To > yesterday)
                .OrderBy(x => x.From)
                .ProjectTo<BookingSimpleDto>()
                .ToList();
        }
    }
}