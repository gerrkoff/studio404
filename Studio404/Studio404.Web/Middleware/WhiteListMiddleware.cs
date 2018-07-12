using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Studio404.Web.Middleware
{
    public class WhiteListMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly PathString _pathStartsWith;
        private readonly string _policyName;
    
        public WhiteListMiddleware(RequestDelegate next, WhiteListOptions options)
        {
            _next = next;
            _pathStartsWith = options.PathStartsWith;
            _policyName = options.PolicyName;
        }

		public async Task Invoke(HttpContext httpContext, IAuthorizationService authorizationService)
		{
			if (httpContext.Request.Path.StartsWithSegments(_pathStartsWith))
			{
				await _next(httpContext);
				return;
			}

			AuthorizationResult authorized = await authorizationService.AuthorizeAsync(httpContext.User, null, _policyName);

			if (authorized.Succeeded)
			{
				await _next(httpContext);
				return;
			}
			else if (httpContext.User.Identity.IsAuthenticated)
			{
				httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
			}
			else
			{
				await httpContext.ChallengeAsync();
				return;
			}
		}
    }

    public class WhiteListOptions
    {
        public PathString PathStartsWith { get; set; }
        public string PolicyName { get; set; }
    }
}