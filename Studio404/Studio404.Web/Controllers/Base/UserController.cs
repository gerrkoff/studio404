using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dal.Entity;

namespace Studio404.Web.Controllers
{
    public class UserController : Controller
    {
        private readonly UserManager<UserEntity> _userManager;
        
        public UserController(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }
        
        protected UserEntity GetUser()
        {
            return _userManager.GetUserAsync(HttpContext.User).Result;
        }
    }
}