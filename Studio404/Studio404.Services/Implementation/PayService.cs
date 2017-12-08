using System;
using System.Linq;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class PayService : IPayService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;
        private readonly INotificationService _notificationService;

        public PayService(IRepository<BookingEntity> bookingRepository, INotificationService notificationService)
        {
            _bookingRepository = bookingRepository;
            _notificationService = notificationService;
        }

        public void ConfirmBooking(Guid guid)
        {
            // TODO: Log warning if booking already paid
            
            int bookingId = _bookingRepository.GetAll()
                .Where(x => x.Guid == guid)
                .Select(x => x.Id)
                .Single();

            string code = GenerateBookingCode();
            var booking = new BookingEntity {Id = bookingId, Code = code, Status = BookingStatusEnum.Paid};
            _bookingRepository.SaveProperties(booking, x => x.Code, x => x.Status);

            _notificationService.SendBookingCodeAsync(bookingId);
        }

        private string GenerateBookingCode()
        {
            var random = new Random();
            int numericCode = random.Next(10000);
            
            return numericCode.ToString().PadLeft(4, '0');
        }
    }
}