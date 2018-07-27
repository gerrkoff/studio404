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
        private readonly SignInManager<UserEntity> _signInManager;
        private readonly INotificationService _notificationService;
        private readonly ITokenService _tokenService;

        public AccountService(UserManager<UserEntity> userManager, INotificationService notificationService,
            ITokenService tokenService, SignInManager<UserEntity> signInManager)
        {
            _userManager = userManager;
            _notificationService = notificationService;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        public async Task<RegisterResultDto> Register(RegisterInfoDto registerInfo)
        {
            var result = new RegisterResultDto();

            var user = new UserEntity { UserName = registerInfo.Username, DisplayName = registerInfo.Username };
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

        public async Task<ConfirmPhoneResultDto> ConfirmPhone(CurrentUser user, string phone, string code)
        {
            var result = new ConfirmPhoneResultDto();
            
            UserEntity userEntity = await _userManager.FindByIdAsync(user.UserId);
            IdentityResult changePhoneresult = await _userManager.ChangePhoneNumberAsync(userEntity, phone, code);

            if (changePhoneresult.Succeeded)
            {
                result.Result = ConfirmPhoneResultEnum.Success;
                result.Token = _tokenService.GetToken(userEntity, user.Expires);
            }
            else if (changePhoneresult.Errors.Any(x => string.Equals(x.Code, "InvalidToken")))
            {
                result.Result = ConfirmPhoneResultEnum.InvalidCode;
            }
            else
            {
                result.Result = ConfirmPhoneResultEnum.Unknown;
            }

            return result;
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

        public async Task<LoginResultEnum> LoginCookie(LoginInfoDto loginInfo)
        {
            SignInResult result =
                await _signInManager.PasswordSignInAsync(loginInfo.Username, loginInfo.Password, false, false);

            if (result == SignInResult.Failed)
                return LoginResultEnum.WrongUsernamePassword;
            if (result == SignInResult.Success)
                return LoginResultEnum.Success;
            return LoginResultEnum.Unknown;
        }

        public Task LogoutCookie()
        {
            return _signInManager.SignOutAsync();
        }

		public async Task<SendPassResetTokenResultEnum> SendPassResetToken(string userId)
		{
			UserEntity userEntity = await _userManager.FindByNameAsync(userId);

			if (userEntity == null || !userEntity.PhoneNumberConfirmed)
				return SendPassResetTokenResultEnum.UnknownUserOrPhoneNotConfirmed;

			string token = await _userManager.GeneratePasswordResetTokenAsync(userEntity);
			bool succeed = await _notificationService.SendPassResetTokenAsync(userEntity.PhoneNumber, token);

			return succeed
				? SendPassResetTokenResultEnum.Success
				: SendPassResetTokenResultEnum.Unknown;
		}

		public async Task<ResetPassResultEnum> ResetPassword(ResetPassInfoDto resetPassInfo)
		{
			UserEntity userEntity = await _userManager.FindByNameAsync(resetPassInfo.UserId);

			if (userEntity == null)
				return ResetPassResultEnum.InvalidTokenOrUsername;

			IdentityResult result = await _userManager.ResetPasswordAsync(userEntity, resetPassInfo.Token, resetPassInfo.NewPassword);

			if (result.Succeeded)
				return ResetPassResultEnum.Success;
			else if (result.Errors.Any(x => string.Equals(x.Code, "InvalidToken")))
				return ResetPassResultEnum.InvalidTokenOrUsername;
			else
				return ResetPassResultEnum.Unknown;
		}
	}
}