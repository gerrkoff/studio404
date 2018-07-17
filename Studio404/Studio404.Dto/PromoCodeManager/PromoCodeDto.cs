using System;

namespace Studio404.Dto.PromoCodeManager
{
	public class PromoCodeDto
    {
		public int Id { get; set; }
		public DateTime From { get; set; }
		public DateTime To { get; set; }
		public int Discount { get; set; }
		public string Description { get; set; }
		public string Code { get; set; }
	}
}
