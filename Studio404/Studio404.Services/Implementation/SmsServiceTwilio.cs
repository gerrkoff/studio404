using System.Threading.Tasks;
using Studio404.Services.Interface;
using System.Net.Http;
using System.Web;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Studio404.Common.Exceptions;
using Studio404.Common.Settings;
using Studio404.Dto.Sms;
using Microsoft.Extensions.Logging;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using System;

namespace Studio404.Services.Implementation
{
    public class SmsServiceTwilio : ISmsService
    {
        private readonly SmsServiceSettings _smsServiceSettings;
        private readonly ILogger<SmsServiceTwilio> _logger;

        public SmsServiceTwilio(IOptions<SmsServiceSettings> smsServiceSettings, ILogger<SmsServiceTwilio> logger)
        {
            _smsServiceSettings = smsServiceSettings.Value;
            _logger = logger;
            
            /*
			if (!_smsServiceSettings.ValidateSettingsSmsRu())
                throw new ServiceException($"Sms Service [SmsServiceTwilio] is not properly set up");
                */
		}
        
        public async Task<bool> SendAsync(string phone, string text)
        {
            const string accountSid = "";
            const string authToken = "";
            TwilioClient.Init(accountSid, authToken);

            try
            {
                MessageResource result = MessageResource.Create(
                from: new PhoneNumber("+"),
                to: new PhoneNumber($"+7{phone}"),
                    body: text);    
            }
            catch(Exception e)
            {
                _logger.LogError(e, $"Twilio sms error. Message: {e.Message}");
                throw;
            }

            return await Task.FromResult(true);
        }
    }
}