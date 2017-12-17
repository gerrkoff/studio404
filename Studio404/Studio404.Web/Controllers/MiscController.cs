using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.PlatformAbstractions;
using Studio404.Dto.Misc;
using Studio404.Web.Controllers.Base;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class MiscController : BaseController
    {
        [HttpGet]
        public MiscInfoDto Info()
        {
            return new MiscInfoDto
            {
                Version = Assembly.GetExecutingAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>()
                    .InformationalVersion
            };
        }
    }
}