using System;
using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.Booking
{
    public class MakeBookingInfoDto
    {
        [Required]
        public int? From { get; set; }
        
        [Required]
        public int? To { get; set; }
        
        [Required]
        public DateTime? Date { get; set; }
    }
}