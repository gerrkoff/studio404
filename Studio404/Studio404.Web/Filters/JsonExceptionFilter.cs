using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Studio404.Web.Filters
{
    public class JsonExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            context.Result = new ObjectResult(new
            {
                Message = "Something went wrong..."
            }) {StatusCode = 500};
            
            
            #if DEBUG
            
            context.Result = new ObjectResult(context.Exception) {StatusCode = 500};
            
            #endif
            
        }
    }
}