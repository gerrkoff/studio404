using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;

namespace Studio404.Web.Admin.Middleware
{
    public class AntiforgeryMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _clientCookieName;
    
        public AntiforgeryMiddleware(RequestDelegate next, string clientCookieName)
        {
            _next = next;
            _clientCookieName = clientCookieName;
        }
 
        public async Task Invoke(HttpContext httpContext, IAntiforgery antiforgery)
        {
            string path = httpContext.Request.Path.Value;
            
            if (httpContext.Request.Method == HttpMethods.Get &&
                (
                    string.Equals(path, "/", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(path, "/index.html", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(path, "/login", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(path, "/index-login.html", StringComparison.OrdinalIgnoreCase)
                ))
            {
                // The request token can be sent as a JavaScript-readable cookie, 
                // and Angular uses it by default.
                AntiforgeryTokenSet tokens = antiforgery.GetAndStoreTokens(httpContext);
                httpContext.Response.Cookies.Append(_clientCookieName,
                    tokens.RequestToken,
                    new CookieOptions {HttpOnly = false});
            }
            
            await _next(httpContext);
        }
    }
}