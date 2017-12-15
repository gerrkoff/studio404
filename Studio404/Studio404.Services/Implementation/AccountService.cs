using System.Linq;
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
        private readonly INotificationService _notificationService;
        private readonly ITokenService _tokenService;

        public AccountService(UserManager<UserEntity> userManager, INotificationService notificationService, ITokenService tokenService)
        {
            _userManager = userManager;
            _notificationService = notificationService;
            _tokenService = tokenService;
        }

        public async Task<RegisterResultDto> Register(RegisterInfoDto registerInfo)
        {
            var result = new RegisterResultDto();

            var user = new UserEntity { UserName = registerInfo.Username };                
            IdentityResult creareUserResult = await _userManager.CreateAsync(user, registerInfo.Password);

            if (creareUserResult.Succeeded)
            {
                result.Result = RegisterResultEnum.Success;
                result.Token = _tokenService.GetToken(user);
            }
            else if (creareUserResult.Errors.Any(x => string.Equals(x.Code, "DuplicateUserName")))
            {
                result.Result = RegisterResultEnum.UsernameAlreadyExists;
            }
            else
            {
                result.Result = RegisterResultEnum.Unknown;
            }

            return result;
        }

        public async Task<LoginResultDto> Login(LoginInfoDto loginInfo)
        {
            var result = new LoginResultDto();

            UserEntity user = await _userManager.FindByNameAsync(loginInfo.Username);

            if (user == null)
            {
                result.Result = LoginResultEnum.WrongUsernamePassword;
            }
            else if (!await _userManager.CheckPasswordAsync(user, loginInfo.Password))
            {
                result.Result = LoginResultEnum.WrongUsernamePassword;
            }
            else
            {
                result.Result = LoginResultEnum.Success;
                result.Token = _tokenService.GetToken(user);
            }

            return result;
        }

        public async Task<SendPhoneConfirmationResultEnum> SendPhoneConfirmation(CurrentUser user, string phone)
        {
            if (user.PhoneConfirmed && string.Equals(user.Phone, phone))
                return SendPhoneConfirmationResultEnum.PhoneAlreadyConfirmed;

            UserEntity userEntity = await _userManager.FindByIdAsync(user.UserId);
            string token = await _userManager.GenerateChangePhoneNumberTokenAsync(userEntity, phone);
            bool succeed = await _notificationService.SendPhoneConfirmationAsync(phone, token);

            return succeed
                ? SendPhoneConfirmationResultEnum.Success
                : SendPhoneConfirmationResultEnum.Unknown;
        }

        public async Task<ConfirmPhoneResultEnum> ConfirmPhone(CurrentUser user, string phone, string code)
        {
            UserEntity userEntity = await _userManager.FindByIdAsync(user.UserId);
            IdentityResult result = await _userManager.ChangePhoneNumberAsync(userEntity, phone, code);
            
            if (result.Succeeded)
                return ConfirmPhoneResultEnum.Success;
            else if (result.Errors.Any(x => string.Equals(x.Code, "InvalidToken")))
                return ConfirmPhoneResultEnum.InvalidCode;
            else
                return ConfirmPhoneResultEnum.Unknown;
        }

        public async Task<ChangePassResultEnum> ChangePassword(CurrentUser user, ChangePassInfoDto changePassInfo)
        {
            UserEntity userEntity = await _userManager.FindByIdAsync(user.UserId);
            IdentityResult result = await _userManager.ChangePasswordAsync(userEntity, changePassInfo.CurrentPassword,
                changePassInfo.NewPassword);

            if (result.Succeeded)
                return ChangePassResultEnum.Success;
            else if (result.Errors.Any(x => string.Equals(x.Code, "PasswordMismatch")))
                return ChangePassResultEnum.WrongCurrentPassword;
            else
                return ChangePassResultEnum.Unknown;
        }
    }
}