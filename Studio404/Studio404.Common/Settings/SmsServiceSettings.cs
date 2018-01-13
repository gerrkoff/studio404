namespace Studio404.Common.Settings
{
    public class SmsServiceSettings
    {
		public string Provider { get; set; }
		
		public string SmsRu_ApiId { get; set; }

	    public string Twilio_AccountId { get; set; }
	    public string Twilio_AuthToken { get; set; }
	    public string Twilio_PhoneFrom { get; set; }

		public bool ValidateSettingsSmsRu()
		{
			return !string.IsNullOrWhiteSpace(SmsRu_ApiId);
		}
	    
	    public bool ValidateSettingsTwilio()
	    {
		    return !string.IsNullOrWhiteSpace(Twilio_AccountId) &&
		           !string.IsNullOrWhiteSpace(Twilio_AuthToken) &&
		           !string.IsNullOrWhiteSpace(Twilio_PhoneFrom);
	    }
    }
}