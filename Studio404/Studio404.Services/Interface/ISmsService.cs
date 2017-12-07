using System.Threading.Tasks;
using Studio404.Common.Enums;

namespace Studio404.Services.Interface
{
    public interface ISmsService
    {
        Task<SmsSendResultEnum> SendAsync(string phone, string text);
    }
}