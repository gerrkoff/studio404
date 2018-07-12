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

namespace Studio404.Services.Implementation
{
    public class UserManagerService : IUserManagerService
    {
		private const string ROLE_ADMINISTRATOR = "Administrator";

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

		public async Task UpdateUserRoleAsync(UpdateUserRoleInfoDto updateUserRoleInfo)
		{
			UserEntity user = await _userManager.FindByIdAsync(updateUserRoleInfo.UserId);

			if (user == null)
				throw new ServiceException("No user found");

			IdentityResult result = await (updateUserRoleInfo.IsAdmin
				? _userManager.AddToRoleAsync(user, ROLE_ADMINISTRATOR)
				: _userManager.RemoveFromRoleAsync(user, ROLE_ADMINISTRATOR));
			
			if (!result.Succeeded)
			{
				string errors = result.Errors.Select(x => x.Description).Aggregate((s1, s2) => s1 + "; " + s2);
				throw new ServiceException($"Failed updating role. Errors: {errors}");
			}
		}
	}
}