using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : BaseUserController
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService, UserManager<UserEntity> userManager) : base(userManager)
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
        public async Task<CurrentUserDto> Current()
        {
            if (!User.Identity.IsAuthenticated)
                return new CurrentUserDto {UserLoggedIn = false};
                
            UserEntity user = await GetUserAsync();
            return new CurrentUserDto
            {
                UserLoggedIn = User.Identity.IsAuthenticated,
                Username = user.UserName,
                PhoneConfirmed = user.PhoneNumberConfirmed
            };
        }

        [HttpPost]
        public async Task<SendPhoneConfirmationResultEnum> SendPhoneConfirmation(PhoneInfoDto phoneInfo)
        {
            Validate();
            return await _accountService.SendPhoneConfirmation(await GetUserAsync(), phoneInfo.Phone);
        }

        [HttpPost]
        public async Task<ConfirmPhoneResultEnum> ConfirmPhone(ConfirmPhoneInfoDto confirmPhoneInfo)
        {
            Validate();
            return await _accountService.ConfirmPhone(await GetUserAsync(), confirmPhoneInfo.Phone,
                confirmPhoneInfo.Code);
        }

        [HttpPost]
        public async Task<ChangePassResultEnum> ChangePassword(ChangePassInfoDto changePassInfo)
        {
            Validate();
            return await _accountService.ChangePassword(await GetUserAsync(), changePassInfo);
        }
    }
}