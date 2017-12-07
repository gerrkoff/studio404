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
            if (ModelState.IsValid)
                return await _accountService.Register(registerInfo);
            else
                throw new ModelValidationException(ModelState);
        }

        [HttpPost]
        public async Task<LoginResultEnum> Login(LoginInfoDto loginInfo)
        {
            if (ModelState.IsValid)
                return await _accountService.Login(loginInfo);
            else
                throw new ModelValidationException(ModelState);
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
        public async Task<SendPhoneConfirmationResultEnum> SendPhoneConfirmation(string phone)
        {
            // TODO: validate phone here

            return await _accountService.SendPhoneConfirmation(await GetUserAsync(), phone);
        }

        [HttpPost]
        public async Task<ConfirmPhoneResultEnum> ConfirmPhone(string phone, string code)
        {
            return await _accountService.ConfirmPhone(await GetUserAsync(), phone, code);
        }
    }
}