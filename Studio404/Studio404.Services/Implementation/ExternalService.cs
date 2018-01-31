using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dto.External;
using Studio404.Services.Interface;
using System.Security.Claims;
using System;

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

			ExtendedUserLoginInfo loginInfo = GetLoginInfoFromAuthenticateResult(authenticateResult);
			UserEntity user = await _userManager.FindByLoginAsync(loginInfo.LoginProvider, loginInfo.ProviderKey);

			if (user == null)
			{
				user = new UserEntity { UserName = Guid.NewGuid().ToString(), DisplayName = loginInfo.UserDisplayName };
				IdentityResult createUserResult = await _userManager.CreateAsync(user);
				if (createUserResult.Succeeded)
				{
					IdentityResult addLoginInfoResult = await _userManager.AddLoginAsync(user, loginInfo);
					if (!addLoginInfoResult.Succeeded)
						return result;
				}
				else
				{
					return result;
				}
			}

			result.Result = ExternalLoginResultEnum.Success;
			result.Token = _tokenService.GetToken(user);

			return result;
		}

		private ExtendedUserLoginInfo GetLoginInfoFromAuthenticateResult(AuthenticateResult authenticateResult)
		{
			string loginProvider = authenticateResult.Principal.Identity.AuthenticationType;
			string providerKey = authenticateResult.Principal.FindFirst(ClaimTypes.NameIdentifier).Value;
			string username = loginProvider;

			return new ExtendedUserLoginInfo(loginProvider, providerKey, username);
		}

		private class ExtendedUserLoginInfo : UserLoginInfo
		{
			public ExtendedUserLoginInfo(string loginProvider, string providerKey, string userDisplayName) : base(loginProvider, providerKey, loginProvider)
			{
				UserDisplayName = userDisplayName;
			}

			public string UserDisplayName { get; set; }
		}
	}
}