using System;
using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using Microsoft.Extensions.Logging;
using Studio404.Dto.Pay;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class PayController : Controller
    {
        private readonly IPayService _payService;
        private readonly ILogger<PayController> _logger;

        public PayController(IPayService payService, ILogger<PayController> logger)
        {
            _payService = payService;
            _logger = logger;
        }

        [HttpGet("{guid}")]
        public void Confirm(Guid guid)
        {
            _logger.LogInformation($"Guid: {guid}");
            
            // TODO: implement security
            _payService.ConfirmBooking(guid);
        }
        
        [HttpPost]
        public PrepareBookingPaymentDto Prepare(int id)
        {
            _logger.LogInformation($"Id: {id}");
            
            return _payService.PrepareBookingPayment(id);
        }
    }
}