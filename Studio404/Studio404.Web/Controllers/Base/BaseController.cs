using Microsoft.AspNetCore.Mvc;
using Studio404.Common.Exceptions;

namespace Studio404.Web.Controllers.Base
{
    public class BaseController : Controller
    {
        protected void Validate()
        {
            if(!ModelState.IsValid)
                throw new ModelValidationException(ModelState);
        }
    }
}