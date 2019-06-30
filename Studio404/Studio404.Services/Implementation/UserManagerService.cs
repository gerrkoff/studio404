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
using Studio404.Common.Exceptions;
using System;
using Studio404.Dal;
using Studio404.Services.Extensions;

namespace Studio404.Services.Implementation
{
    public class UserManagerService : IUserManagerService
    {
		private readonly UserManager<UserEntity> _userManager;
		private readonly IAdminConfiguration _configuration;

        public UserManagerService(UserManager<UserEntity> userManager, IAdminConfiguration configuration)
        {
	        _userManager = userManager;
	        _configuration = configuration;
        }

		public async Task<IEnumerable<UserDto>> GetUsersAsync(string userId)
		{
			IList<UserDto> users = _userManager.Users.ProjectTo<UserDto>().ToList();
			IList<string> admins = (await _userManager.GetUsersInRoleAsync(Roles.ADMINISTRATOR_ROLE_NAME))
				.Select(x => x.Id).ToList();

			foreach (UserDto user in users)
			{
				user.IsAdmin = admins.Contains(user.Id);
			}

			if (_configuration.DemoStaging)
			{
				users = users.HideSensitiveData(userId);
			}
			
			return users;
		}

		public async Task UpdateUserRoleAsync(UpdateUserRoleInfoDto updateUserRoleInfo)
		{
			UserEntity user = await _userManager.FindByIdAsync(updateUserRoleInfo.UserId);

			if (user == null)
				throw new ServiceException("No user found");

			IdentityResult result = await (updateUserRoleInfo.IsAdmin
				? _userManager.AddToRoleAsync(user, Roles.ADMINISTRATOR_ROLE_NAME)
				: _userManager.RemoveFromRoleAsync(user, Roles.ADMINISTRATOR_ROLE_NAME));
			
			if (!result.Succeeded)
			{
				string errors = result.Errors.Select(x => x.Description).Aggregate((s1, s2) => s1 + "; " + s2);
				throw new ServiceException($"Failed updating role. Errors: {errors}");
			}
		}
	}
}