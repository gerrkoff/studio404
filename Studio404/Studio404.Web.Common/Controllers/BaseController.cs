using Microsoft.AspNetCore.Mvc;
using Studio404.Common.Exceptions;

namespace Studio404.Web.Common.Controllers
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