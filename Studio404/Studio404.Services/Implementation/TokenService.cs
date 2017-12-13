using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class TokenService : ITokenService
    {

        private readonly UserManager<UserEntity> _userManager;

        public TokenService(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }

        public async Task<TokenObtainResultDto> GetToken(LoginInfoDto loginInfo)
        {
            ClaimsIdentity identity = await GetIdentity(loginInfo);
            if (identity == null)
                return new TokenObtainResultDto {Result = LoginResultEnum.WrongUsernamePassword};

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            
            string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new TokenObtainResultDto
            {
                Token = encodedJwt,
                Result = LoginResultEnum.Success
            };
        }
        
        private async Task<ClaimsIdentity> GetIdentity(LoginInfoDto loginInfo)
        {
            UserEntity user = await _userManager.FindByNameAsync(loginInfo.Username);

            if (user == null)
                return null;

            if (!await _userManager.CheckPasswordAsync(user, loginInfo.Password))
                return null;
            
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName)
            };

            ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token",
                    ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer"; // издатель токена
        public const string AUDIENCE = "http://localhost:51884/"; // потребитель токена
        const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации
        public const int LIFETIME = 1; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}