using Studio404.Common.Enums;

namespace Studio404.Dto.External
{
	public class ExternalRegisterResultDto
	{
		public string Token { get; set; }
		public string ReturnUrl { get; set; }
		public ExternalRegisterResultEnum Result { get; set; }
	}
}