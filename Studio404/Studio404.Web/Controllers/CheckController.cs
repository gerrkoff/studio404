using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Studio404.Services.Interface;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]")]
    public class CheckController : Controller
    {
        private readonly ICheckService _checkService;
        private readonly ILogger<CheckController> _logger;
        
        public CheckController(ICheckService checkService, ILogger<CheckController> logger)
        {
            _checkService = checkService;
            _logger = logger;
        }
        
        [HttpGet("{shift}/{code}")]
        public bool Get(int shift, string code)
        {
            _logger.LogInformation("Checking " + code);
            return _checkService.Check(shift, code);
        }
    }
}