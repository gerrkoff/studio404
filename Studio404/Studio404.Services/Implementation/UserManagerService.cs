using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;
using Studio404.Dto.UserManager;
using Studio404.Services.Interface;
using Studio404.Dal.Repository;
using AutoMapper.QueryableExtensions;

namespace Studio404.Services.Implementation
{
    public class UserManagerService : IUserManagerService
    {
		private const string ROLE_ADMINISTRATOR = "administrator";

		private readonly UserManager<UserEntity> _userManager;

        public UserManagerService(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }

		public async Task<IEnumerable<UserDto>> GetUsersAsync()
		{
			IList<UserDto> users = _userManager.Users.ProjectTo<UserDto>().ToList();
			IList<string> admins = (await _userManager.GetUsersInRoleAsync(ROLE_ADMINISTRATOR))
				.Select(x => x.Id).ToList();

			foreach (UserDto user in users)
			{
				user.IsAdmin = admins.Contains(user.Id);
			}
			
			return users;
		}
	}
}