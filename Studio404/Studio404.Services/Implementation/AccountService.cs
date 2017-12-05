using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;

        public AccountService(UserManager<UserEntity> userManager, SignInManager<UserEntity> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task Register(RegisterInfoDto registerInfo)
        {
            var user = new UserEntity
            {
                UserName = registerInfo.Username
            };
                
            IdentityResult result = await _userManager.CreateAsync(user, registerInfo.Password);

            if (result.Succeeded)
                await _signInManager.SignInAsync(user, false);
            else
                throw new Exception("Login failed: " + result.Errors.First().Description);
        }

        public async Task Login(LoginInfoDto loginInfo)
        {
            var result =
                await _signInManager.PasswordSignInAsync(loginInfo.Username, loginInfo.Password, false, false);
            if(!result.Succeeded)
                throw new Exception("Login failed");
        }
    }
}