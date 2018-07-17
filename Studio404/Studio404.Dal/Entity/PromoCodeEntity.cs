using System.ComponentModel.DataAnnotations;
using Studio404.Dal.Entity.Base;
using System;

namespace Studio404.Dal.Entity
{
	public class PromoCodeEntity : DeletableEntity
    {
		[Required]
        public DateTime From { get; set; }
		[Required]
		public DateTime To { get; set; }
		[Required, Range(0, 100)]
		public int Discount { get; set; }
		[Required]
		public string Code { get; set; }
		public string Description { get; set; }
    }
}