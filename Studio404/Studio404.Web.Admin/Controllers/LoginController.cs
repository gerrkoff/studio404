using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Studio404.Common.Enums;
using Studio404.Dto.Account;
using Studio404.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Studio404.Web.Common.Controllers;

namespace Studio404.Web.Admin.Controllers
{
    [Route("[controller]")]
	[AllowAnonymous]
    public class LoginController : BaseController
    {
        private readonly IAccountService _accountService;

        public LoginController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        public FileResult Get()
        {
            return File("~/login/index-login.html", "text/html");
        }

        [HttpPost]
        public Task<LoginResultEnum> Post([FromBody] LoginInfoDto loginInfo)
        {
            Validate();
            return _accountService.LoginCookie(loginInfo);

        }

        [HttpDelete]
        public Task Delete()
        {
            return _accountService.LogoutCookie();
        }
    }
}
