using System;
using System.Linq;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class PayService : IPayService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;

        public PayService(IRepository<BookingEntity> bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        public void ConfirmBooking(Guid guid)
        {
            int bookingId = _bookingRepository.GetAll()
                .Where(x => x.Guid == guid)
                .Select(x => x.Id)
                .Single();

            int code = GenerateBookingCode();
            var booking = new BookingEntity {Id = bookingId, Code = code};
            _bookingRepository.SaveProperties(booking, x => x.Code);
        }

        private int GenerateBookingCode()
        {
            return 1000;
        }
    }
}