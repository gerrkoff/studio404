using Studio404.Common.Enums;

namespace Studio404.Dto.External
{
	public class ExternalLoginResultDto
    {
		public string Token { get; set; }
		public string ReturnUrl { get; set; }
        public string Provider { get; set; }
		public ExternalLoginResultEnum Result { get; set; }
	}
}