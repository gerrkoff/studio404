using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;
using Studio404.Dto.UserManager;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class UserManagerService : IUserManagerService
    {
        private readonly UserManager<UserEntity> _userManager;

        public UserManagerService(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }

		public IEnumerable<UserDto> GetUsers()
		{
			throw new System.NotImplementedException();
		}
	}
}