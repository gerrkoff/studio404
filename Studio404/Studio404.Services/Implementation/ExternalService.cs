using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dto.External;
using Studio404.Services.Interface;
using System.Security.Claims;
using System.Linq;

namespace Studio404.Services.Implementation
{
    public class ExternalService : IExternalService
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly ITokenService _tokenService;

        public ExternalService(UserManager<UserEntity> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

		public async Task<ExternalLoginResultDto> Process(AuthenticateResult authenticateResult)
		{
			var result = new ExternalLoginResultDto();

            if (authenticateResult == null || !authenticateResult.Succeeded)
				return result;

			UserLoginInfo loginInfo = GetLoginInfoFromAuthenticateResult(authenticateResult);
			UserEntity user = await _userManager.FindByLoginAsync(loginInfo.LoginProvider, loginInfo.ProviderKey);
			if (user == null)
			{
				result.Result = ExternalLoginResultEnum.AccountNotCreated;
			}
			else
			{
				result.Result = ExternalLoginResultEnum.Success;
				result.Token = _tokenService.GetToken(user);
			}

			return result;
		}

		public async Task<ExternalRegisterResultDto> Register(ExternalRegisterInfoDto externalRegisterInfo, AuthenticateResult authenticateResult)
		{
			var result = new ExternalRegisterResultDto();

            if (authenticateResult == null || !authenticateResult.Succeeded)
				return result;

			UserLoginInfo loginInfo = GetLoginInfoFromAuthenticateResult(authenticateResult);
			var user = new UserEntity { UserName = externalRegisterInfo.Username };
			IdentityResult createUserResult = await _userManager.CreateAsync(user);
			if (createUserResult.Succeeded)
			{
				IdentityResult addLoginInfoResult = await _userManager.AddLoginAsync(user, loginInfo);
				if (addLoginInfoResult.Succeeded)
				{
					result.Result = ExternalRegisterResultEnum.Success;
					result.Token = _tokenService.GetToken(user);
				}
				else
				{
					result.Result = ExternalRegisterResultEnum.Unknown;
				}				
			}
			else if (createUserResult.Errors.Any(x => string.Equals(x.Code, "DuplicateUserName")))
			{
				result.Result = ExternalRegisterResultEnum.UsernameAlreadyExists;
			}
			else
			{
				result.Result = ExternalRegisterResultEnum.Unknown;
			}

			return result;
		}

		private UserLoginInfo GetLoginInfoFromAuthenticateResult(AuthenticateResult authenticateResult)
		{
			string loginProvider = authenticateResult.Principal.Identity.AuthenticationType;
			string providerKey = authenticateResult.Principal.FindFirst(ClaimTypes.NameIdentifier).Value;
			return new UserLoginInfo(loginProvider, providerKey, loginProvider);
		}
	}
}