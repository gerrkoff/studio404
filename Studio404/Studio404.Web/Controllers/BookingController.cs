using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dto.Booking;
using Studio404.Services.Interface;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BookingController : Controller
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
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
            _bookingService.MakeBooking(makeBookingInfo);
        }
        
        [Route("api/check")]
        [HttpGet]
        public bool Check(int code)
        {
            return true;
        }
    }
}