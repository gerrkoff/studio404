using System;
using System.Linq;
using System.Threading.Tasks;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class NotificationService : INotificationService
    {
        private readonly ISmsService _smsService;
        private readonly IRepository<BookingEntity> _bookingRepository;

        public NotificationService(ISmsService smsService, IRepository<BookingEntity> bookingRepository)
        {
            _smsService = smsService;
            _bookingRepository = bookingRepository;
        }

        public async Task<bool> SendPhoneConfirmationAsync(string phone, string code)
        {
            string text = $"Your phone confirmation code: {code}";
            try
            {
                return await _smsService.SendAsync(phone, text);
            }
            catch (Exception e)
            {
                // TODO: log it
                throw;
            }
        }

        public async Task<bool> SendBookingCodeAsync(int id)
        {
            BookingEntity booking = _bookingRepository.GetAll(x => x.User).Single(x => x.Id == id);

            if (!booking.User.PhoneNumberConfirmed)
            {
                // TODO: log it
                return false;
            }
            
            string phone = booking.User.PhoneNumber;
            string text =
                $"Studio is waiting for you at {booking.Date.ToShortDateString()} from {booking.From} to {booking.To + 1}. Code: {booking.Code}";
            try
            {
                return await _smsService.SendAsync(phone, text);
            }
            catch (Exception e)
            {
                // TODO: log it
                throw;
            }
        }
    }
}