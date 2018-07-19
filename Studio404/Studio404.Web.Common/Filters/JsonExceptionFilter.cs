using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace Studio404.Web.Common.Filters
{
    public class JsonExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<JsonExceptionFilter> _logger;

        public JsonExceptionFilter(ILogger<JsonExceptionFilter> logger)
        {
            _logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception, string.Empty);

            context.Result = new ObjectResult(new
            {
                Message = "Something went wrong...!"
            }) {StatusCode = 500};
            
            
            #if DEBUG
            
            context.Result = new ObjectResult(context.Exception) {StatusCode = 500};
            
            #endif
            
        }
    }
}