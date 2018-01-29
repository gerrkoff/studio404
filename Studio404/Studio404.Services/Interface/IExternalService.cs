using System.Threading.Tasks;
using Studio404.Dto.External;
using Microsoft.AspNetCore.Authentication;

namespace Studio404.Services.Interface
{
	public interface IExternalService
    {
        Task<ExternalLoginResultDto> Process(AuthenticateResult authenticateResult);
		Task<ExternalRegisterResultDto> Register(ExternalRegisterInfoDto externalRegisterInfo, AuthenticateResult authenticateResult);
    }
}