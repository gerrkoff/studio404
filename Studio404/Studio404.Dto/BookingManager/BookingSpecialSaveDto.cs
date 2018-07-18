using System;
using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.BookingManager
{
    public class BookingSpecialSaveDto
	{
		[Required]
        public int? Id { get; set; }

		[Required]
        public DateTime? From { get; set; }

		[Required]
        public DateTime? To { get; set; }

		[Required, RegularExpression("\\d+")]
        public string Code { get; set; }
    }
}