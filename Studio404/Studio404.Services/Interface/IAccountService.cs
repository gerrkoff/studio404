using System.Threading.Tasks;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;

namespace Studio404.Services.Interface
{
    public interface IAccountService
    {
        Task<RegisterResultEnum> Register(RegisterInfoDto registerInfo);
        Task<LoginResultEnum> Login(LoginInfoDto loginInfo);
        Task<SendPhoneConfirmationResultEnum> SendPhoneConfirmation(UserEntity user, string phone);
        Task<ConfirmPhoneResultEnum> ConfirmPhone(UserEntity user, string phone, string code);
    }
}