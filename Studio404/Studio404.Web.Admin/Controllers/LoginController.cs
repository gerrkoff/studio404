using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Studio404.Web.Admin.Controllers
{
    [Route("/[controller]")]
    public class LoginController : Controller
    {
        [HttpGet]
        public FileResult Get()
        {
            return File("~/Login/index-login.html", "text/html");
        }
    }
}
