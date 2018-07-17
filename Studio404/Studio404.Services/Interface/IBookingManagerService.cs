using System.Collections.Generic;
using Studio404.Dto.BookingManager;

namespace Studio404.Services.Interface
{
    public interface IBookingManagerService
	{
		IEnumerable<BookingUserDto> GetUserBookings();
		void CancelUserBooking(int id);

		IEnumerable<BookingSpecialDto> GetSpecialBookings();
	}
}