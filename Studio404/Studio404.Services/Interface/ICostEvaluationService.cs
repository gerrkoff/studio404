using System;

namespace Studio404.Services.Interface
{
    public interface ICostEvaluationService
    {
        double EvaluateBookingCost(DateTime from, DateTime to);
    }
}