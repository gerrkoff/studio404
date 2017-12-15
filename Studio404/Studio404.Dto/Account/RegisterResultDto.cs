using Studio404.Common.Enums;

namespace Studio404.Dto.Account
{
    public class RegisterResultDto
    {
        public string Token { get; set; }
        public RegisterResultEnum Result { get; set; }
    }
}
