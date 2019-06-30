using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using System.Collections.Generic;
using Studio404.Dto.BookingManager;
using Studio404.Common.Exceptions;
using Studio404.Web.Admin.Controllers.Base;

namespace Studio404.Web.Admin.Controllers
{
	[Route("api/[controller]")]
    public class BookingsController : BaseUserController
	{
		private readonly IBookingManagerService _bookingManagerService;

        public BookingsController(IBookingManagerService bookingManagerService)
        {
	        _bookingManagerService = bookingManagerService;
        }

        [HttpGet("user")]
        public IEnumerable<BookingUserDto> GetUserBookings()
        {
	        return _bookingManagerService.GetUserBookings(GetUser().UserId);
        }
		
		[HttpDelete("user/{id}")]
		public void DeleteUserBooking(int id)
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

		[HttpDelete("special/{id}")]
		public void DeleteSpecial(int id)
		{
			_bookingManagerService.DeleteSpecialBooking(id);
		}
	}
}
