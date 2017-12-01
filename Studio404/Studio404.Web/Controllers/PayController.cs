using System;
using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class PayController : Controller
    {
        private readonly IPayService _payService;

        public PayController(IPayService payService)
        {
            _payService = payService;
        }

        [HttpGet("{guid}")]
        public void Confirm(Guid guid)
        {
            // TODO: implement security
            _payService.ConfirmBooking(guid);
        }
    }
}