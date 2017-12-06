using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Studio404.Common.Exceptions;
using Studio404.Dal.Entity;
using Studio404.Dto.Booking;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BookingController : BaseUserController
    {
        private readonly IBookingService _bookingService;

        public BookingController(UserManager<UserEntity> userManager, IBookingService bookingService)
            : base(userManager)
        {
            _bookingService = bookingService;
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
            if (ModelState.IsValid)
                _bookingService.MakeBooking(makeBookingInfo, GetUser());
            else
                throw new ModelValidationException(ModelState);
        }

        [HttpPost]
        public void Reject(int id)
        {
            _bookingService.RejectBooking(id, GetUser());
        }
    }
}