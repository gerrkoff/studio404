using System.Collections.Generic;
using Studio404.Dto.BookingManager;

namespace Studio404.Services.Interface
{
    public interface IBookingManagerService
	{
		IEnumerable<BookingUserDto> GetUserBookings(string userId);
		void CancelUserBooking(int id);

		IEnumerable<BookingSpecialDto> GetSpecialBookings();
		BookingSpecialDto SaveSpecialBooking(BookingSpecialSaveDto bookingSpecialDto);
		void DeleteSpecialBooking(int id);
	}
}