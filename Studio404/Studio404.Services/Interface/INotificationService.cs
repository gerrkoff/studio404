using System.Threading.Tasks;

namespace Studio404.Services.Interface
{
    public interface INotificationService
    {
        Task<bool> SendPhoneConfirmationAsync(string phone, string code);
    }
}