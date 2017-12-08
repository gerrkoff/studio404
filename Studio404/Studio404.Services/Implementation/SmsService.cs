using System.Threading.Tasks;
using Studio404.Services.Interface;
using System.Net.Http;
using System.Web;
using Newtonsoft.Json;
using Studio404.Common.Enums;
using Studio404.Common.Exceptions;
using Studio404.Dto.Sms;

namespace Studio404.Services.Implementation
{
    public class SmsService : ISmsService
    {
        public async Task<SmsSendResultEnum> SendAsync(string phone, string text)
        {
            string smsRequestUrl = GenerateServiceRequstUrl(phone, text);
            
            using (var httpClient = new HttpClient())
            {
                HttpResponseMessage response = await httpClient.GetAsync(smsRequestUrl);
                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    return ProcessResult(content, phone);
                }
            }
            
            throw new ServiceException($"Sms Service request failed - {smsRequestUrl}");
        }
        
        private string GenerateServiceRequstUrl(string phone, string text)
        {
            string url = "https://sms.ru/sms/send?api_id={0}&to={1}&msg={2}&json=1";
            string apiId = "B8079332-9FB7-3AFF-27ED-5E03C2EE5B24";
            return string.Format(url, apiId, phone, HttpUtility.UrlEncode(text));
        }

        private SmsSendResultEnum ProcessResult(string content, string phone)
        {
            ServiceReponseDto serviceResponse = JsonConvert.DeserializeObject<ServiceReponseDto>(content);

            if (serviceResponse.StatusCode != 100)
                return SmsSendResultEnum.ServiceError;

            if (!serviceResponse.Sms.ContainsKey(phone))
                return SmsSendResultEnum.ServiceError;

            ServiceReponseDto.SmsResult smsResult = serviceResponse.Sms[phone];

            if (smsResult.StatusCode == 207 || smsResult.StatusCode == 202)
                return SmsSendResultEnum.WrongNumber;

            if (smsResult.StatusCode == 100)
                return SmsSendResultEnum.Succeed;

            return SmsSendResultEnum.ServiceError;
        }

        
    }
}