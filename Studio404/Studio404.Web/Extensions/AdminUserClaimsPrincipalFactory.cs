using Microsoft.AspNetCore.Identity;
using Studio404.Dal.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.Extensions.Options;

namespace Studio404.Web.Extensions
{
	public class AdminUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<UserEntity, IdentityRole>
	{
		public AdminUserClaimsPrincipalFactory(
			UserManager<UserEntity> userManager,
			RoleManager<IdentityRole> roleManager,
			IOptions<IdentityOptions> optionsAccessor) : base(userManager, roleManager, optionsAccessor)
		{
		}

		public async override Task<ClaimsPrincipal> CreateAsync(UserEntity user)
		{
			ClaimsPrincipal principal = await base.CreateAsync(user);

			((ClaimsIdentity)principal.Identity).AddClaim(new Claim(ClaimTypes.GivenName, user.DisplayName));

			return principal;
		}
	}
}
