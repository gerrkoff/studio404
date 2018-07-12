using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Studio404.Common.Enums;
using Studio404.Dto.Account;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;
using System.Collections;
using Studio404.Dto.UserManager;
using System.Collections.Generic;

namespace Studio404.Web.Admin.Controllers
{
    [Route("api/[controller]")]
    public class UserManagerController : BaseController
    {
        private readonly IUserManagerService _userManagerService;

        public UserManagerController(IUserManagerService userManagerService)
        {
			_userManagerService = userManagerService;
        }

        [HttpGet]
        public IEnumerable<UserDto> Get()
        {
			return _userManagerService.GetUsers();
        }
    }
}
