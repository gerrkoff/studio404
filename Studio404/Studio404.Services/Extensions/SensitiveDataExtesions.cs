using System.Collections.Generic;
using Studio404.Dto.BookingManager;
using Studio404.Dto.UserManager;

namespace Studio404.Services.Extensions
{
    public static class SensitiveDataExtensions
    {
        private const string HiddenTextSymbols = "***";
        
        public static IList<UserDto> HideSensitiveData(this IList<UserDto> users, string userIdToIgnore)
        {
            foreach (var user in users)
            {
                if (string.Equals(user.Id, userIdToIgnore))
                    continue;
                user.UserName = HiddenTextSymbols;
                user.DisplayName = HiddenTextSymbols;
                user.PhoneNumber = HiddenTextSymbols;
            }
            return users;
        }
        
        public static IList<BookingUserDto> HideSensitiveData(this IList<BookingUserDto> bookings, string userIdToIgnore)
        {
            foreach (var booking in bookings)
            {
                if (string.Equals(booking.UserId, userIdToIgnore))
                    continue;
                booking.UserPhone = HiddenTextSymbols;
                booking.UserDisplayName = HiddenTextSymbols;
            }
            return bookings;
        }
    }
}