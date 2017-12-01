using System.Collections.Generic;
using Studio404.Dal.Entity;
using Studio404.Dto.Booking;

namespace Studio404.Services.Interface
{
    public interface IUserService
    {
        IEnumerable<BookingSimpleDto> GetUserBookings(UserEntity user);
    }
}