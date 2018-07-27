using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Studio404.Common.Enums;
using Studio404.Dto.Account;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : BaseUserController
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public async Task<RegisterResultDto> Register(RegisterInfoDto registerInfo)
        {
            Validate();
            return await _accountService.Register(registerInfo);
        }

        [HttpPost]
        public async Task<LoginResultDto> Login(LoginInfoDto loginInfo)
        {
            Validate();
            return await _accountService.Login(loginInfo);
        }

        [HttpGet]
        public CurrentUserDto Current()
        {
            return User.Identity.IsAuthenticated
                ? Mapper.Map<CurrentUserDto>(GetUser())
                : new CurrentUserDto();
        }

        [Authorize]
        [HttpPost]
        public async Task<SendPhoneConfirmationResultEnum> SendPhoneConfirmation(PhoneInfoDto phoneInfo)
        {
            Validate();
            return await _accountService.SendPhoneConfirmation(GetUser(), phoneInfo.Phone);
        }

        [Authorize]
        [HttpPost]
        public async Task<ConfirmPhoneResultDto> ConfirmPhone(ConfirmPhoneInfoDto confirmPhoneInfo)
        {
            Validate();
            return await _accountService.ConfirmPhone(GetUser(), confirmPhoneInfo.Phone,
                confirmPhoneInfo.Code);
        }

        [Authorize]
        [HttpPost]
        public async Task<ChangePassResultEnum> ChangePassword(ChangePassInfoDto changePassInfo)
        {
            Validate();
            return await _accountService.ChangePassword(GetUser(), changePassInfo);
        }

		[HttpPost]
		public async Task<SendPassResetTokenResultEnum> SendPassResetToken(string userId)
		{
			return await _accountService.SendPassResetToken(userId);
		}

		[HttpPost]
		public async Task<ResetPassResultEnum> ResetPassword(ResetPassInfoDto resetPassInfo)
		{
			Validate();
			return await _accountService.ResetPassword(resetPassInfo);
		}
	}
}