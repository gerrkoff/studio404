using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class NotificationService : INotificationService
    {
        private readonly ISmsService _smsService;
        private readonly UserManager<UserEntity> _userManager;

        public NotificationService(ISmsService smsService, UserManager<UserEntity> userManager)
        {
            _smsService = smsService;
            _userManager = userManager;
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

        public async Task<bool> SendBookingCodeAsync(BookingEntity booking)
        {
            UserEntity user = await _userManager.FindByIdAsync(booking.UserId);

            if (!user.PhoneNumberConfirmed)
            {
                // TODO: log it
                return false;
            }
            
            string phone = user.PhoneNumber;
            string text =
                // TODO: fix sms format
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