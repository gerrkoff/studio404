using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Studio404.Dal.Entity;
using Studio404.Services.Interface;
using Microsoft.Extensions.Logging;

namespace Studio404.Services.Implementation
{
    public class NotificationService : INotificationService
    {
        private readonly ISmsService _smsService;
        private readonly UserManager<UserEntity> _userManager;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(ISmsService smsService, UserManager<UserEntity> userManager, ILogger<NotificationService> logger)
        {
            _smsService = smsService;
            _userManager = userManager;
            _logger = logger;
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
                _logger.LogError(e, $"Send phone confirm error. Phone: {phone}; Code: {code}");
                throw;
            }
        }

        public async Task<bool> SendBookingCodeAsync(BookingEntity booking)
        {
            if (booking == null)
            {
                _logger.LogWarning("Send booking code error: booking was null");
                return false;
            }

            UserEntity user = await _userManager.FindByIdAsync(booking.UserId);

            if (!user.PhoneNumberConfirmed)
            {
                _logger.LogWarning($"Send booking code error: user phone was not confirmed. Booking Id: {booking?.Id}");
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
                _logger.LogError(e, $"Send booking code error. Phone: {phone}; Booking Id: {booking?.Id}");
                throw;
            }
        }
    }
}