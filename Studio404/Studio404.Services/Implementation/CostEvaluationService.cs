using System;
using Microsoft.Extensions.Options;
using Studio404.Common.Settings;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class CostEvaluationService : ICostEvaluationService
    {
        private readonly StudioSettings _studioSettings;

        public CostEvaluationService(IOptions<StudioSettings> studioSettings)
        {
            _studioSettings = studioSettings.Value;
        }
        
        public double EvaluateBookingCost(DateTime date, int from, int to)
        {
            return (to - from + 1) * _studioSettings.HourCost;
        }
    }
}