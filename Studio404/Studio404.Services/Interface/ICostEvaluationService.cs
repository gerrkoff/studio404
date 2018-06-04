﻿using System;
using System.Collections.Generic;
using Studio404.Dto.Booking;

namespace Studio404.Services.Interface
{
    public interface ICostEvaluationService
    {
        double EvaluateBookingCost(DateTime from, DateTime to);
        IEnumerable<IntervalCostDto> EvaluateIntervalCosts(DateTime from, DateTime to);
    }
}