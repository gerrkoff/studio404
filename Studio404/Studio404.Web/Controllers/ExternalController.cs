using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dto.External;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using System.Web;
using Microsoft.Extensions.Logging;

namespace Studio404.Web.Controllers
{
	[Route("api/[controller]/[action]")]
	public class ExternalController : BaseController
	{
		private readonly IExternalService _externalService;
		private readonly ILogger<ExternalController> _logger;

		public ExternalController(IExternalService externalService, ILogger<ExternalController> logger)
		{
			_externalService = externalService;
			_logger = logger;
		}

		[HttpGet]
		[Route("/externallogin/{provider}")]
		public IActionResult Login(string provider, string returnUrl = null)
		{
			var redirectUrl = Url.Action("Callback", "External", new { returnUrl = returnUrl });
			var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
			return new ChallengeResult(provider, properties);
		}

		[HttpGet]
		[Route("/externalcallback")]
		public IActionResult Callback(string returnUrl = null, string remoteError = null)
		{
			if(!string.IsNullOrWhiteSpace(remoteError))
				_logger.LogWarning($"External login failed failed. Remote error: {remoteError}");

			returnUrl = HttpUtility.UrlEncode(returnUrl);
			return Redirect($"/#/extlogin?returnUrl={returnUrl}");
		}

		[HttpPost]
		public async Task<ExternalLoginResultDto> Process()
		{
			return await _externalService.Process(await HttpContext.AuthenticateAsync(IdentityConstants.ExternalScheme));
		}
	}
}