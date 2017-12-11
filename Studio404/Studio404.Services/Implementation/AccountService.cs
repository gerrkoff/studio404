﻿using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;
        private readonly INotificationService _notificationService;

        public AccountService(UserManager<UserEntity> userManager, SignInManager<UserEntity> signInManager,
            INotificationService notificationService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _notificationService = notificationService;
        }

        public async Task<RegisterResultEnum> Register(RegisterInfoDto registerInfo)
        {
            var user = new UserEntity
            {
                UserName = registerInfo.Username
            };
                
            IdentityResult result = await _userManager.CreateAsync(user, registerInfo.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return RegisterResultEnum.Success;
            }
            else if (result.Errors.Any(x => string.Equals(x.Code, "DuplicateUserName")))
            {
                return RegisterResultEnum.UsernameAlreadyExists;
            }
            else
            {
                return RegisterResultEnum.Unknown;
            }
        }

        public async Task<LoginResultEnum> Login(LoginInfoDto loginInfo)
        {
            SignInResult result =
                await _signInManager.PasswordSignInAsync(loginInfo.Username, loginInfo.Password, false, false);

            if (result.Succeeded)
                return LoginResultEnum.Success;
            else
                return LoginResultEnum.WrongUsernamePassword;
        }

        public async Task<SendPhoneConfirmationResultEnum> SendPhoneConfirmation(UserEntity user, string phone)
        {
            if (user.PhoneNumberConfirmed && string.Equals(user.PhoneNumber, phone))
                return SendPhoneConfirmationResultEnum.PhoneAlreadyConfirmed;
            
            string token = await _userManager.GenerateChangePhoneNumberTokenAsync(user, phone);
            bool succeed = await _notificationService.SendPhoneConfirmationAsync(phone, token);

            return succeed
                ? SendPhoneConfirmationResultEnum.Success
                : SendPhoneConfirmationResultEnum.Unknown;
        }

        public async Task<ConfirmPhoneResultEnum> ConfirmPhone(UserEntity user, string phone, string code)
        {
            IdentityResult result = await _userManager.ChangePhoneNumberAsync(user, phone, code);
            
            if (result.Succeeded)
                return ConfirmPhoneResultEnum.Success;
            else if (result.Errors.Any(x => string.Equals(x.Code, "InvalidToken")))
                return ConfirmPhoneResultEnum.InvalidCode;
            else
                return ConfirmPhoneResultEnum.Unknown;
        }
    }
}