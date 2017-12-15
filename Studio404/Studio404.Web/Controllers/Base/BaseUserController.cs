using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Studio404.Dal.Entity;
using System.Threading.Tasks;
using Studio404.Dto.Account;

namespace Studio404.Web.Controllers.Base
{
    public class BaseUserController : BaseController
    {
        private readonly UserManager<UserEntity> _userManager;
        
        public BaseUserController(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }

        protected CurrentUser GetCurrentUser()
        {
            var identity = (ClaimsIdentity) User.Identity;
            var user = new CurrentUser
            {
                Username = identity.FindFirst(ClaimsIdentity.DefaultNameClaimType).Value,
                UserId = identity.FindFirst(ClaimTypes.Sid).Value,
                Phone = identity.FindFirst(ClaimTypes.MobilePhone)?.Value
            };
            return user;
        }
        
        protected UserEntity GetUser()
        {
            return GetUserAsync().Result;
        }

        protected async Task<UserEntity> GetUserAsync()
        {
            return await _userManager.FindByNameAsync(User.Identity.Name);
        }
    }
}