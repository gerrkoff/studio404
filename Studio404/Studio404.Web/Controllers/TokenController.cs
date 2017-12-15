using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]")]
    public class TokenController : BaseController
    {
        private readonly ITokenService _tokenService;

        public TokenController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }
    }
}