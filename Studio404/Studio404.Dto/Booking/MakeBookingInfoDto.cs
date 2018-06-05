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

        // ReSharper disable PossibleInvalidOperationException
        public DateTime GetFromDateTime() =>
            DateTime.SpecifyKind(Date.Value.Date.AddHours(From.Value), DateTimeKind.Unspecified);
        
        public DateTime GetToDateTime() =>
            DateTime.SpecifyKind(Date.Value.Date.AddHours(To.Value + 1), DateTimeKind.Unspecified);
        // ReSharper restore PossibleInvalidOperationException
    }
}