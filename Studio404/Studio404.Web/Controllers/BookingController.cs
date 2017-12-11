using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dal.Entity;
using Studio404.Dto.Booking;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;
using Microsoft.Extensions.Logging;

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

        [HttpPost]
        public void Make(MakeBookingInfoDto makeBookingInfo)
        {
            Validate();
            _bookingService.MakeBooking(makeBookingInfo, GetUser());

            _logger.LogInformation($"Date: {makeBookingInfo.Date}; From: {makeBookingInfo.From}; To: {makeBookingInfo.To}");
        }

        [HttpPost]
        public void Cancel(int id)
        {
            _bookingService.CancelBooking(id, GetUser());

            _logger.LogInformation($"Id: {id}");
        }
        
        [HttpPost]
        public async Task<bool> ResendCode(int id)
        {
            return await _bookingService.ResendBookingCode(id, GetUser());

            _logger.LogInformation($"Id: {id}");
        }
    }
}