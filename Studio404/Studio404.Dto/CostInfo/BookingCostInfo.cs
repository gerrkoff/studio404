using System.Collections.Generic;
using Studio404.Dto.Booking;

namespace Studio404.Dto.CostInfo
{
    public class BookingCostDto
    {
        public PromoCodeInfoDto PromoCode { get; set; }
        public double TotalCost { get; set; }
        public IEnumerable<IntervalCostDto> IntervalCosts { get; set; }
    }
}