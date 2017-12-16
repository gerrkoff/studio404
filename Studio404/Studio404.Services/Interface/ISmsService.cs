using System.Threading.Tasks;

namespace Studio404.Services.Interface
{
    public interface ISmsService
    {
        Task<bool> SendAsync(string phone, string text);
    }
}