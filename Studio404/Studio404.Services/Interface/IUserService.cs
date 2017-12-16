using System.Collections.Generic;
using Studio404.Dto.Account;
using Studio404.Dto.Booking;

namespace Studio404.Services.Interface
{
    public interface IUserService
    {
        IEnumerable<BookingSimpleDto> GetUserBookings(CurrentUser user);
    }
}