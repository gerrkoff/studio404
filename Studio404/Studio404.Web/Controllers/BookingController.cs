﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dal.Entity;
using Studio404.Dto.Booking;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;
using Microsoft.Extensions.Logging;
using Studio404.Dto.CostInfo;
using Studio404.Dto.Pay;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BookingController : BaseUserController
    {
        private readonly IBookingService _bookingService;
		private readonly ICostEvaluationService _costEvaluationService;
		private readonly ILogger<BookingController> _logger;

        public BookingController(UserManager<UserEntity> userManager, IBookingService bookingService, ICostEvaluationService costEvaluationService, ILogger<BookingController> logger)
        {
            _bookingService = bookingService;
			_costEvaluationService = costEvaluationService;
			_logger = logger;
        }
        
        [HttpGet]
        public IEnumerable<DayWorkloadDto> Workload(DateTime weekStartDate)
        {
            return _bookingService.GetWeekWorkload(weekStartDate);
        }

        [HttpGet]
        public IEnumerable<DayHourDto> Hours(DateTime chosenDate)
        {
            return _bookingService.GetDayWorkload(chosenDate);
        }

        [Authorize]
        [HttpPost]
        public int Make(MakeBookingInfoDto makeBookingInfo)
        {
            Validate();
            
            int bookingId = _bookingService.MakeBooking(makeBookingInfo, GetUser());

            _logger.LogInformation($"Date: {makeBookingInfo.Date}; From: {makeBookingInfo.From}; To: {makeBookingInfo.To}");

            return bookingId;
        }

        [Authorize]
        [HttpPost]
        public void Cancel(int id)
        {
            _bookingService.CancelBooking(id, GetUser());

            _logger.LogInformation($"Id: {id}");
        }
        
        [Authorize]
        [HttpPost]
        public async Task<bool> ResendCode(int id)
        {
            _logger.LogInformation($"Id: {id}");
            
            return await _bookingService.ResendBookingCode(id, GetUser());
        }
        
        [Authorize]
        [HttpPost]
        public PrepareBookingPaymentDto Prepare(int id)
        {
            _logger.LogInformation($"Id: {id}");
            
            return _bookingService.PrepareBookingPayment(id, GetUser());
        }
		
		[HttpPost]
        public BookingCostDto Cost(MakeBookingInfoDto makeBookingInfo)
		{
			Validate();
		    DateTime from = makeBookingInfo.GetFromDateTime();
		    DateTime to = makeBookingInfo.GetToDateTime();
            return _costEvaluationService.EvaluateBookingCost(from, to, makeBookingInfo.PromoCode);
		}
	}
}