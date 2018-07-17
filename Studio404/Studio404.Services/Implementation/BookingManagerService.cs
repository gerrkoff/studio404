using System.Collections.Generic;
using System.Linq;
using AutoMapper.QueryableExtensions;
using Studio404.Common.Enums;
using Studio404.Common.Exceptions;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Dto.BookingManager;
using Studio404.Services.Interface;
using AutoMapper;

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
            return _bookingRepository.GetAll(x => x.User)
				.Where(x => x.Status != BookingStatusEnum.Special)
				.ProjectTo<BookingUserDto>()
				.ToList();
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

		public IEnumerable<BookingSpecialDto> GetSpecialBookings()
		{
			return _bookingRepository.GetAll()
				.Where(x => x.Status == BookingStatusEnum.Special)
				.ProjectTo<BookingSpecialDto>()
				.ToList();
		}

		public BookingSpecialDto SaveSpecialBooking(BookingSpecialSaveDto bookingSpecialDto)
		{
			BookingEntity entity = bookingSpecialDto.Id.Value <= 0
				? InsertEntity(bookingSpecialDto)
				: UpdateEntity(bookingSpecialDto);

			_bookingRepository.Save(entity);

			return Mapper.Map<BookingSpecialDto>(entity);
		}

		private BookingEntity UpdateEntity(BookingSpecialSaveDto bookingSpecialDto)
		{
			BookingEntity entity = _bookingRepository.GetById(bookingSpecialDto.Id.Value);

			if (entity == null)
				throw new ServiceException("Booking does not exist");

			// TODO: uncomment this
			/*
			if (entity.IsDeleted)
				throw new ServiceException("Hour Cost has been already deleted");
			*/

			if (entity.Status != BookingStatusEnum.Special)
				throw new ServiceException("Booking should be special");

			entity.From = bookingSpecialDto.From.Value;
			entity.To = bookingSpecialDto.To.Value;
			entity.Code = bookingSpecialDto.Code;

			return entity;
		}

		private BookingEntity InsertEntity(BookingSpecialSaveDto bookingSpecialDto)
		{
			BookingEntity entity = Mapper.Map<BookingEntity>(bookingSpecialDto);
			entity.Id = 0;
			entity.Status = BookingStatusEnum.Special;
			return entity;
		}
	}
}