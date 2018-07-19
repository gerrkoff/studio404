using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace Studio404.Web.Common.Filters
{
    public class ActionLoggingFilter : Attribute, IAsyncActionFilter
    {
        private readonly ILogger<ActionLoggingFilter> _logger;

        private readonly ICollection<string> _exceptionalMethods =
            new[] {HttpMethods.Get, HttpMethods.Head, HttpMethods.Options, HttpMethods.Trace};

        public ActionLoggingFilter(ILogger<ActionLoggingFilter> logger)
        {
            _logger = logger;
        }
        
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (_exceptionalMethods.Contains(context.HttpContext.Request.Method))
            {
                await next();                
            }
            else
            {
                await next();
                
                string username = context.HttpContext.User.Identity.Name ?? "[Empty]";
                _logger.LogInformation($"Requested by {username}. Payload");
            }
        }
    }
}