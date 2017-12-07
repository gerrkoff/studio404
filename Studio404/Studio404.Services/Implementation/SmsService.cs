using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query.ExpressionVisitors.Internal;
using Studio404.Services.Interface;
using System.Diagnostics;

namespace Studio404.Services.Implementation
{
    public class SmsService : ISmsService
    {
        public Task<bool> SendAsync(string phone, string text)
        {
            Debug.WriteLine(phone);
            Debug.WriteLine(text);
            return Task.FromResult(true);
        }
    }
}