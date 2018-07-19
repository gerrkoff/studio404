using Microsoft.AspNetCore.Identity;
using Studio404.Dal.Entity;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.Extensions.Options;

namespace Studio404.Web.Common.Configuration
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
