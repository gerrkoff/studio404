using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]")]
    public class CheckController : Controller
    {
        private readonly ICheckService _checkService;
        
        public CheckController(ICheckService checkService)
        {
            _checkService = checkService;
        }
        
        [HttpGet("{shift}/{code}")]
        public bool Get(int shift, string code)
        {
            return _checkService.Check(shift, code);
        }
    }
}