using System;
using System.Threading.Tasks;
using Studio404.Services.Interface;
using System.Diagnostics;
using Studio404.Common.Enums;

namespace Studio404.Services.Implementation
{
    public class SmsService : ISmsService
    {
        public Task<SmsSendResultEnum> SendAsync(string phone, string text)
        {
            return Task.FromResult(SmsSendResultEnum.Succeed);
        }
    }
}