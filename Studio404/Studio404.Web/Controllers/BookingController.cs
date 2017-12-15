using System;
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
using Studio404.Dto.Pay;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BookingController : BaseUserController
    {
        private readonly IBookingService _bookingService;
        private readonly ILogger<BookingController> _logger;

        public BookingController(UserManager<UserEntity> userManager, IBookingService bookingService, ILogger<BookingController> logger)
            : base(userManager)
        {
            _bookingService = bookingService;
            _logger = logger;
        }
        
        [HttpGet]
        public IEnumerable<DayWorkloadDto> Workload(DateTime weekStartDate)
        {
            return _bookingService.GetWeekWorkload(weekStartDate);
        }

        [HttpGet]
        public IEnumerable<DayHourDto> Hours(DateTime date)
        {
            return _bookingService.GetDayWorkload(date);
        }

        [Authorize]
        [HttpPost]
        public void Make(MakeBookingInfoDto makeBookingInfo)
        {
            Validate();
            _bookingService.MakeBooking(makeBookingInfo, GetUser());

            _logger.LogInformation($"Date: {makeBookingInfo.Date}; From: {makeBookingInfo.From}; To: {makeBookingInfo.To}");
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
    }
}