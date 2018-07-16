using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;
using System.Collections.Generic;
using Studio404.Dto.BookingManager;

namespace Studio404.Web.Admin.Controllers
{
	[Route("api/[controller]")]
    public class BookingsController : BaseController
	{
		private readonly IBookingManagerService _bookingManagerService;

        public BookingsController(IBookingManagerService bookingManagerService)
        {
	        _bookingManagerService = bookingManagerService;
        }

        [HttpGet("user")]
        public IEnumerable<BookingUserDto> Get()
        {
	        return _bookingManagerService.GetUserBookings();
        }
	}
}
