using System;
using System.Collections.Generic;
using Studio404.Dto.Booking;
using Studio404.Dto.Schedule;

namespace Studio404.Services.Interface
{
    public interface ICostEvaluationService
    {
        double EvaluateBookingCost(DateTime from, DateTime to, string promoCode);
        IEnumerable<IntervalCostDto> EvaluateIntervalCosts(DateTime from, DateTime to, string promoCode);
        StudioSchedule GetSchedule();
    }
}