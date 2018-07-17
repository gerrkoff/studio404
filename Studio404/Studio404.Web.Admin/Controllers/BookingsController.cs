using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;
using System.Collections.Generic;
using Studio404.Dto.BookingManager;
using Studio404.Common.Exceptions;

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
        public IEnumerable<BookingUserDto> GetUser()
        {
	        return _bookingManagerService.GetUserBookings();
        }
		
		[HttpDelete("user/{id}")]
		public void DeleteUser(int id)
		{
			_bookingManagerService.CancelUserBooking(id);
		}

		[HttpGet("special")]
		public IEnumerable<BookingSpecialDto> GetSpecial()
		{
			return _bookingManagerService.GetSpecialBookings();
		}

		[HttpPost("special")]
		public BookingSpecialDto PostSpecial([FromBody] BookingSpecialSaveDto bookingSpecialDto)
		{
			Validate();

			if (bookingSpecialDto.From > bookingSpecialDto.To)
				throw new ModelValidationException("From should be less than To");

			return _bookingManagerService.SaveSpecialBooking(bookingSpecialDto);
		}
	}
}
