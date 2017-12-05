using System.Threading.Tasks;
using Studio404.Dto.Account;

namespace Studio404.Services.Interface
{
    public interface IAccountService
    {
        Task Register(RegisterInfoDto registerInfo);
        Task Login(LoginInfoDto loginInfo);
    }
}