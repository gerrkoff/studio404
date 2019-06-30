using System.Security.Claims;
using Studio404.Dto.Account;
using Studio404.Web.Common.Controllers;

namespace Studio404.Web.Admin.Controllers.Base
{
    public class BaseUserController : BaseController
    {
        protected CurrentUser GetUser()
        {
            var identity = (ClaimsIdentity)HttpContext.User.Identity;
            var user = new CurrentUser
            {
                UserId = identity.FindFirst(ClaimTypes.NameIdentifier).Value,
                DisplayName = identity.FindFirst(ClaimTypes.GivenName).Value
            };
            
            return user;
        }
    }
}