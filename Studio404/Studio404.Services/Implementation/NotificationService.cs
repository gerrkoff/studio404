using System.Threading.Tasks;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class NotificationService : INotificationService
    {
        private readonly ISmsService _smsService;

        public NotificationService(ISmsService smsService)
        {
            _smsService = smsService;
        }

        public async Task<bool> SendPhoneConfirmationAsync(string phone, string text)
        {
            return await _smsService.SendAsync(phone, text);
        }
    }
}