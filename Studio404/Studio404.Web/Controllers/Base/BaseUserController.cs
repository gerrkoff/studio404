using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dal.Entity;

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
            return _userManager.GetUserAsync(HttpContext.User).Result;
        }
    }
}