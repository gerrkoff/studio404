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
            bool checkResult = _checkService.Check(shift, code);

            _logger.LogInformation($"Shift: {shift}; Code: {code}; Result: {checkResult}");

            return checkResult;
        }
    }
}