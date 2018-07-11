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
            if (!httpContext.Request.Path.StartsWithSegments(_pathStartsWith))
            {
                AuthorizationResult authorized =
                    await authorizationService.AuthorizeAsync(httpContext.User, null, _policyName);

                if (!authorized.Succeeded)
                {
                    await httpContext.ChallengeAsync();
                    return;
                }
            }
            
            await _next(httpContext);
        }
    }

    public class WhiteListOptions
    {
        public PathString PathStartsWith { get; set; }
        public string PolicyName { get; set; }
    }
}