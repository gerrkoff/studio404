using System;
using Studio404.Common.Enums;

namespace Studio404.Dto.Booking
{
    public class BookingSimpleDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int From { get; set; }
        public int To { get; set; }
        public BookingStatusEnum Status { get; set; }
    }
}