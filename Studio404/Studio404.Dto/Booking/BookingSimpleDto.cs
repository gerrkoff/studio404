using System;

namespace Studio404.Dto.Booking
{
    public class BookingSimpleDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int From { get; set; }
        public int To { get; set; }
        public BookingStatus Status { get; set; }
    }

    public enum BookingStatus
    {
        Unpaid, Paid, Canceled
    }
}