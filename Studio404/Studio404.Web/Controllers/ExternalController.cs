using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dto.External;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;
using Microsoft.AspNetCore.Identity;
using Studio404.Dal.Entity;
using Microsoft.AspNetCore.Authentication;

namespace Studio404.Web.Controllers
{
	[Route("[controller]/[action]")]
	public class ExternalController : BaseController
	{
		private readonly UserManager<UserEntity> _userManager;
		private readonly IExternalService _externalService;

		public ExternalController(UserManager<UserEntity> userManager, IExternalService externalService)
		{
			_userManager = userManager;
			_externalService = externalService;
		}

		[HttpGet("{provider}")]
		public IActionResult Login(string provider, string returnUrl = null)
		{
			var redirectUrl = Url.Action("Callback");
			var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
			return new ChallengeResult(provider, properties);
		}

		[HttpGet]
        public IActionResult Callback(string returnUrl = null, string remoteError = null)
		{
            // TODO: log remote error
            return Redirect("/#/extlogin");
		}

		[HttpPost]
		public async Task<ExternalLoginResultDto> Process()
		{
			return await _externalService.Process(await HttpContext.AuthenticateAsync(IdentityConstants.ExternalScheme));
		}

		[HttpPost]
		public async Task<ExternalRegisterResultDto> Register(ExternalRegisterInfoDto externalRegisterInfo)
		{
			Validate();
			return await _externalService.Register(externalRegisterInfo, await HttpContext.AuthenticateAsync(IdentityConstants.ExternalScheme));
		}
	}
}