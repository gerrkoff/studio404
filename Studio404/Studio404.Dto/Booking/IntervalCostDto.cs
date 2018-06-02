using System;

namespace Studio404.Dto.Booking
{
    public class IntervalCostDto
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public double Cost { get; set; }
    }
}