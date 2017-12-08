using System.Diagnostics;
using System.Threading.Tasks;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class SmsServiceMock : ISmsService
    {
        public Task<bool> SendAsync(string phone, string text)
        {
            Debug.WriteLine("___________" + phone);
            Debug.WriteLine("___________" + text);
            return Task.FromResult(true);
        }
    }
}