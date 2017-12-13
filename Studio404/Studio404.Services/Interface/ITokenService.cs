using System.Threading.Tasks;
using Studio404.Dto.Account;

namespace Studio404.Services.Interface
{
    public interface ITokenService
    {
        Task<TokenObtainResultDto> GetToken(LoginInfoDto loginInfo);
    }
}