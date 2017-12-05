using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Studio404.Web.Filters
{
    public class JsonExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var result = new ObjectResult(new
            {
                message = context.Exception.Message,
                exception = context.Exception
            }) {StatusCode = 500};

            context.Result = result;
        }
    }
}