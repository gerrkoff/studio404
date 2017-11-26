using System;

namespace Studio404.Dto.Booking
{
    public class DayWorkloadDto
    {
        public DateTime Date { get; set; }
        public int[] FreeHours { get; set; }
    }
}