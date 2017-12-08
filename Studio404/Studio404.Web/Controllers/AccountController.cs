using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Rest;
using Studio404.Common.Enums;
using Studio404.Common.Exceptions;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;
using System.Threading;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : BaseUserController
    {
        private readonly IAccountService _accountService;
        private readonly SignInManager<UserEntity> _signInManager;

        public AccountController(IAccountService accountService, SignInManager<UserEntity> signInManager,
            UserManager<UserEntity> userManager) : base(userManager)
        {
            _accountService = accountService;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<RegisterResultEnum> Register(RegisterInfoDto registerInfo)
        {
            Validate();
            return await _accountService.Register(registerInfo);
        }

        [HttpPost]
        public async Task<LoginResultEnum> Login(LoginInfoDto loginInfo)
        {
            Validate();   
            return await _accountService.Login(loginInfo);
        }

        [HttpPost]
        public async Task Logoff()
        {
            // TODO: remove method when jwt
            await _signInManager.SignOutAsync();
        }

        [HttpGet]
        public CurrentUserDto Current()
        {
            return new CurrentUserDto
            {
                UserLoggedIn = User.Identity.IsAuthenticated,
                Username = User.Identity.Name
            };
        }

        [HttpPost]
        public async Task<SmsSendResultEnum> SendPhoneConfirmation(PhoneInfoDto phoneInfo)
        {
            Validate();
            Thread.Sleep(1000);
            return await _accountService.SendPhoneConfirmation(await GetUserAsync(), phoneInfo.Phone);
        }

        [HttpPost]
        public async Task<ConfirmPhoneResultEnum> ConfirmPhone(ConfirmPhoneInfoDto confirmPhoneInfo)
        {
            Validate();
            Thread.Sleep(1000);
            return await _accountService.ConfirmPhone(await GetUserAsync(), confirmPhoneInfo.Phone,
                confirmPhoneInfo.Code);
        }
    }
}