using Studio404.Common.Enums;

namespace Studio404.Common.Settings
{
    public class StudioSettings
    {
        public int ScheduleStart { get; set; }
        public int ScheduleEnd { get; set; }
        public double HourCost { get; set; }
        public SpecialCost[] SpecialCosts { get; set; }
        
        public class SpecialCost
        {
            public int HourStart { get; set; }
            public int HourEnd { get; set; }
            public DiscountDayTypeEnum DayType { get; set; }
            public double HourCost { get; set; }
        }
    }
}