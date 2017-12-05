using System.Threading.Tasks;
using Studio404.Common.Enums;
using Studio404.Dto.Account;

namespace Studio404.Services.Interface
{
    public interface IAccountService
    {
        Task<RegisterResultEnum> Register(RegisterInfoDto registerInfo);
        Task<LoginResultEnum> Login(LoginInfoDto loginInfo);
    }
}