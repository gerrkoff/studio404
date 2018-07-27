using System.Threading.Tasks;
using Studio404.Dal.Entity;

namespace Studio404.Services.Interface
{
    public interface INotificationService
    {
        Task<bool> SendPhoneConfirmationAsync(string phone, string code);
        Task<bool> SendBookingCodeAsync(BookingEntity booking);
		Task<bool> SendPassResetTokenAsync(string phone, string token);
	}
}