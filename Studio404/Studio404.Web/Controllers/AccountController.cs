﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Rest;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;
using Studio404.Services.Interface;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly SignInManager<UserEntity> _signInManager;

        public AccountController(IAccountService accountService, SignInManager<UserEntity> signInManager)
        {
            _accountService = accountService;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task Register(RegisterInfoDto registerInfo)
        {
            // TODO: fix exceptions
            
            if (ModelState.IsValid)
            {
                await _accountService.Register(registerInfo);
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
                await _accountService.Login(loginInfo);
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