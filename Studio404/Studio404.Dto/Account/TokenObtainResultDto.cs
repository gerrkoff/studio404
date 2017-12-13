using Studio404.Common.Enums;

namespace Studio404.Dto.Account
{
    public class TokenObtainResultDto
    {
        public string Token { get; set; }
        public LoginResultEnum Result { get; set; }
    }
}