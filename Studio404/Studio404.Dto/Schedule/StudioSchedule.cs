using Studio404.Common.Enums;

namespace Studio404.Dto.Schedule
{
    public class StudioSchedule
    {
        public int Start { get; set; }
        public int End { get; set; }
        public double Cost { get; set; }
        public SpecialCost[] SpecialCosts { get; set; }
        
        public class SpecialCost
        {
            public int Start { get; set; }
            public int End { get; set; }
            public DiscountDayTypeEnum DayType { get; set; }
            public double Cost { get; set; }
        }
    }
}