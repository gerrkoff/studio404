using System.Collections.Generic;
using System.Linq;
using AutoMapper.QueryableExtensions;
using Studio404.Common.Enums;
using Studio404.Common.Exceptions;
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

        public void CancelUserBooking(int id)
        {
            BookingEntity entity = _bookingRepository.GetById(id);
            
            if (entity == null)
                throw new ServiceException("User Booking does not exist");

            if (entity.Status == BookingStatusEnum.Special)
                throw new ServiceException("User Booking is special");

            entity.Status = BookingStatusEnum.Canceled;
            
            _bookingRepository.Save(entity);
        }
    }
}