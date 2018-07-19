using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using Studio404.Dto.UserManager;
using System.Collections.Generic;
using Studio404.Web.Common.Controllers;

namespace Studio404.Web.Admin.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : BaseController
    {
        private readonly IUserManagerService _userManagerService;

        public UsersController(IUserManagerService userManagerService)
        {
			_userManagerService = userManagerService;
        }

        [HttpGet]
        public Task<IEnumerable<UserDto>> Get()
        {
			return _userManagerService.GetUsersAsync();
        }

		[HttpPost]
		public Task Post([FromBody] UpdateUserRoleInfoDto updateUserRoleInfo)
		{
			return _userManagerService.UpdateUserRoleAsync(updateUserRoleInfo);
		}
	}
}
