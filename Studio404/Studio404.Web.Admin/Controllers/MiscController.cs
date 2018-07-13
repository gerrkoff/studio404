using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dto.Misc;
using Studio404.Web.Controllers.Base;
using System.Security.Claims;

namespace Studio404.Web.Admin.Controllers
{
    [Route("api/[controller]")]
    public class MiscController : BaseController
    {
        [HttpGet]
        public MiscInfoAdminDto Get()
        {
			return new MiscInfoAdminDto
			{
				Version = Assembly.GetExecutingAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>()
					.InformationalVersion,
				UserDisplayName = ((ClaimsIdentity)HttpContext.User.Identity).FindFirst(ClaimTypes.GivenName).Value
			};
        }
    }
}