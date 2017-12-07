using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dal.Entity;
using System.Threading.Tasks;

namespace Studio404.Web.Controllers.Base
{
    public class BaseUserController : Controller
    {
        private readonly UserManager<UserEntity> _userManager;
        
        public BaseUserController(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }
        
        protected UserEntity GetUser()
        {
            return GetUserAsync().Result;
        }

        protected async Task<UserEntity> GetUserAsync()
        {
            return await _userManager.GetUserAsync(HttpContext.User);
        }
    }
}