using Studio404.Common.Enums;
using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.UserManager
{
	public class HourCostUpdateDto
	{
		[Required]
		public int? Id { get; set; }

		[Required, Range(0, 23)]
		public int? Start { get; set; }

		[Required, Range(0, 23)]
		public int? End { get; set; }

		[Required]
		public DiscountDayTypeEnum? DayType { get; set; }

		[Required]
		public double? Cost { get; set; }
	}
}
