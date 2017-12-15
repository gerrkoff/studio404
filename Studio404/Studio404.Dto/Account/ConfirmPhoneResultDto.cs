using Studio404.Common.Enums;

namespace Studio404.Dto.Account
{
    public class ConfirmPhoneResultDto
    {
        public string Token { get; set; }
        public ConfirmPhoneResultEnum Result { get; set; }
    }
}