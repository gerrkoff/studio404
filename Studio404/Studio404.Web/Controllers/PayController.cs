﻿using System;
using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using Microsoft.Extensions.Logging;

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
            // TODO: implement security
            _payService.ConfirmBooking(guid);

            _logger.LogInformation($"Guid: {guid}");
        }
    }
}