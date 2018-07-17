using System;
using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.PromoCodeManager
{
	public class PromoCodeSaveDto
	{
		[Required]
		public int? Id { get; set; }

		[Required]
		public DateTime? From { get; set; }

		[Required]
		public DateTime? To { get; set; }

		[Required, Range(0, 100)]
		public int? Discount { get; set; }

		public string Description { get; set; }

		[Required]
		public string Code { get; set; }
	}
}
