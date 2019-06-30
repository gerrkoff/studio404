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
using Studio404.Services.Extensions;

namespace Studio404.Services.Implementation
{
    public class BookingManagerService : IBookingManagerService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;
        private readonly IAdminConfiguration _configuration;

        public BookingManagerService(IRepository<BookingEntity> bookingRepository, IAdminConfiguration configuration)
        {
	        _bookingRepository = bookingRepository;
	        _configuration = configuration;
        }

        public IEnumerable<BookingUserDto> GetUserBookings(string userId)
        {
	        IList<BookingUserDto> bookings = _bookingRepository.GetAll()
		        .Where(x => x.Status != BookingStatusEnum.Special)
		        .ProjectTo<BookingUserDto>()
		        .ToList();
	        
	        if (_configuration.DemoStaging)
	        {
		        bookings = bookings.HideSensitiveData(userId);
	        }
	        
            return bookings;
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

			ValidateSpecialBooking(entity);

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

		public void DeleteSpecialBooking(int id)
		{
			BookingEntity entity = _bookingRepository.GetById(id);

			ValidateSpecialBooking(entity);

			_bookingRepository.Delete(entity);
		}

		private void ValidateSpecialBooking(BookingEntity entity)
		{
			if (entity == null)
				throw new ServiceException("Booking does not exist");

			if (entity.IsDeleted)
				throw new ServiceException("Booking has been already deleted");

			if (entity.Status != BookingStatusEnum.Special)
				throw new ServiceException("Booking should be special");
		}
	}
}