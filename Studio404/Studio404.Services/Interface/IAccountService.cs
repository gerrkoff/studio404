using System.Threading.Tasks;
using Studio404.Common.Enums;
using Studio404.Dto.Account;

namespace Studio404.Services.Interface
{
    public interface IAccountService
    {
        Task<RegisterResultDto> Register(RegisterInfoDto registerInfo);
        Task<LoginResultDto> Login(LoginInfoDto loginInfo);
        Task<SendPhoneConfirmationResultEnum> SendPhoneConfirmation(CurrentUser user, string phone);
        Task<ConfirmPhoneResultDto> ConfirmPhone(CurrentUser user, string phone, string code);
        Task<ChangePassResultEnum> ChangePassword(CurrentUser user, ChangePassInfoDto changePassInfo);
        
        Task<LoginResultEnum> LoginCookie(LoginInfoDto loginInfo);
        Task LogoutCookie();

		Task<SendPassResetTokenResultEnum> SendPassResetToken(string userId);
		Task<ResetPassResultEnum> ResetPassword(ResetPassInfoDto resetPassInfo);
	}
}