using System.ComponentModel.DataAnnotations;
using Studio404.Common.Enums;
using Studio404.Dal.Entity.Base;

namespace Studio404.Dal.Entity
{
    public class HourCostEntity : DeletableEntity
    {
		[Required]
        public int Start { get; set; }
		[Required]
		public int End { get; set; }
		[Required]
		public DiscountDayTypeEnum DayType { get; set; }
		[Required]
		public double Cost { get; set; }
		[Required]
		public bool IsGeneral { get; set; }
    }
}