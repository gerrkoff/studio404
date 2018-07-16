using System.Collections.Generic;
using System.Linq;
using AutoMapper.QueryableExtensions;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Dto.BookingManager;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class BookingManagerService : IBookingManagerService
    {
        private readonly IRepositoryNonDeletable<BookingEntity> _bookingRepository;

        public BookingManagerService(IRepositoryNonDeletable<BookingEntity> bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        public IEnumerable<BookingUserDto> GetUserBookings()
        {
            return _bookingRepository.GetAll(x => x.User).ProjectTo<BookingUserDto>().ToList();
        }
    }
}