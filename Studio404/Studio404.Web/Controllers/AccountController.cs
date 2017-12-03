using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Rest;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;

        public AccountController(UserManager<UserEntity> userManager, SignInManager<UserEntity> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }


        [HttpPost]
        public async Task Register(RegisterInfoDto registerInfo)
        {
            // TODO: fix exceptions
            
            if (ModelState.IsValid)
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
            else
            {
                var errors = new List<ModelError>();
                foreach (ModelStateEntry modelState in ModelState.Values)
                {
                    errors.AddRange(modelState.Errors);
                }
                
                throw new ValidationException("Somehing wrong", "q", errors);
            }
        }

        [HttpPost]
        public async Task Login(LoginInfoDto loginInfo)
        {
            // TODO: refactor
            
            if (ModelState.IsValid)
            {
                var result =
                    await _signInManager.PasswordSignInAsync(loginInfo.Username, loginInfo.Password, false, false);
                if(!result.Succeeded)
                    throw new Exception("Login failed");
            }
            else
            {
                var errors = new List<ModelError>();
                foreach (ModelStateEntry modelState in ModelState.Values)
                {
                    errors.AddRange(modelState.Errors);
                }
                
                throw new ValidationException("Somehing wrong", "q", errors);
            }
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
    }
}