using System.Collections.Generic;
using Newtonsoft.Json;

namespace Studio404.Dto.Sms
{
    public class ServiceReponseDto
    {
        [JsonProperty("status")]
        public string Status { get; set; }
        
        [JsonProperty("status_code")]
        public int StatusCode { get; set; }
        
        [JsonProperty("sms")]
        public Dictionary<string, SmsResult> Sms { get; set; }

        public class SmsResult
        {
            [JsonProperty("status")]
            public string Status { get; set; }
            
            [JsonProperty("status_code")]
            public int StatusCode { get; set; }
            
            [JsonProperty("sms_id")]
            public string SmsId { get; set; }
        }
    }
}