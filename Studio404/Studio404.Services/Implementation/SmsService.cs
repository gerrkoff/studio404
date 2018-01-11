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

namespace Studio404.Services.Implementation
{
    public class SmsServiceSmsRu : ISmsService
    {
        private readonly SmsServiceSettings _smsServiceSettings;
        private readonly ILogger<SmsServiceSmsRu> _logger;

        public SmsServiceSmsRu(IOptions<SmsServiceSettings> smsServiceSettings, ILogger<SmsServiceSmsRu> logger)
        {
            _smsServiceSettings = smsServiceSettings.Value;
            _logger = logger;
        }
        
        public async Task<bool> SendAsync(string phone, string text)
        {
            string smsRequestUrl = GenerateServiceRequstUrl(phone, text);
            
            using (var httpClient = new HttpClient())
            {
                HttpResponseMessage response = await httpClient.GetAsync(smsRequestUrl);
                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    bool result = ProcessResult(content, phone);
                    _logger.LogInformation($"Sms was sent. Phone: {phone}. Text: [{text}]");
                    return result;
                }
            }
            
            throw new ServiceException($"Sms Service [SmsRu] request failed. Url: {smsRequestUrl}");
        }
        
        private string GenerateServiceRequstUrl(string phone, string text)
        {
            string url = "https://sms.ru/sms/send?api_id={0}&to={1}&msg={2}&json=1";
            string apiId = _smsServiceSettings.SmsRu_ApiId;
            return string.Format(url, apiId, phone, HttpUtility.UrlEncode(text));
        }

        private bool ProcessResult(string content, string phone)
        {
            ServiceReponseDto serviceResponse = JsonConvert.DeserializeObject<ServiceReponseDto>(content);

            if (serviceResponse.StatusCode != 100)
                return false;

            if (!serviceResponse.Sms.ContainsKey(phone))
                return false;

            ServiceReponseDto.SmsResult smsResult = serviceResponse.Sms[phone];

            if (smsResult.StatusCode != 100)
                return false;

            return true;
        }
    }
}