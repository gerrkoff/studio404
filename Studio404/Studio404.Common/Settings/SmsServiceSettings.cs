namespace Studio404.Common.Settings
{
    public class SmsServiceSettings
    {
		public string Provider { get; set; }
		public string SmsRu_ApiId { get; set; }

		public bool ValidateSettingsSmsRu()
		{
			return !string.IsNullOrWhiteSpace(SmsRu_ApiId);
		}
    }
}