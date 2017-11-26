using System;

namespace Studio404.Dto.Booking
{
    public class MakeBookingInfoDto
    {
        public int[] Hours { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
    }
}