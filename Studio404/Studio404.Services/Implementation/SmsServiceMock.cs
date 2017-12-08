using System.Diagnostics;
using System.Threading.Tasks;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class SmsServiceMock : ISmsService
    {
        public Task<bool> SendAsync(string phone, string text)
        {
            Debug.WriteLine("\r\n\r\n\r\n\r\n\r\n\r\n");
            Debug.WriteLine("________________________________" + phone);
            Debug.WriteLine("________________________________" + text);
            Debug.WriteLine("\r\n\r\n\r\n\r\n\r\n\r\n");
            return Task.FromResult(!phone.Contains("666"));
        }
    }
}