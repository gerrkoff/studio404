using Studio404.Common.Enums;

namespace Studio404.Dto.UserManager
{
	public class HourCostDto
	{
		public int Id { get; set; }
		public int Start { get; set; }
		public int End { get; set; }
		public DiscountDayTypeEnum DayType { get; set; }
		public double Cost { get; set; }
		public bool IsGeneral { get; set; }
	}
}
