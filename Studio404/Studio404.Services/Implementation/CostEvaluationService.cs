using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Extensions.Options;
using StackExchange.Redis;
using Studio404.Common.Enums;
using Studio404.Common.Settings;
using Studio404.Dto.Booking;
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
        
        public double EvaluateBookingCost(DateTime from, DateTime to)
        {
            return EvaluateIntervalCosts(from, to).Select(x => x.Cost).Sum();
        }

        public IEnumerable<IntervalCostDto> EvaluateIntervalCosts(DateTime from, DateTime to)
        {
            if (_studioSettings.SpecialCosts == null || _studioSettings.SpecialCosts.Length == 0)
                return new[] {CreateIntervalCost(from, to, _studioSettings.HourCost)};

            ICollection<IntervalCostDto> intervalCosts = new Collection<IntervalCostDto>();
            ICollection<Interval> intervals = ParseToIntervals(from, to);
            foreach (var interval in intervals)
            {
                var specialCosts = _studioSettings.SpecialCosts
                    .Where(x => x.DayType.HasFlag(interval.DayType))
                    .Select(x => new
                    {
                        From = interval.From.Date.AddHours(x.HourStart),
                        To = interval.From.Date.AddHours(x.HourEnd + 1),
                        x.HourCost
                    })
                    .OrderBy(x => x.From);

                DateTime intervalStart = interval.From;
                foreach (var specialCost in specialCosts)
                {
                    if (intervalStart >= specialCost.To)
                        continue;

                    if (interval.To <= specialCost.From)
                    {
                        intervalCosts.Add(CreateIntervalCost(intervalStart, interval.To, _studioSettings.HourCost));
                        intervalStart = interval.To;
                        break;
                    }
                    
                    if (intervalStart < specialCost.From)
                    {
                        intervalCosts.Add(CreateIntervalCost(intervalStart, specialCost.From,
                            _studioSettings.HourCost));
                        intervalStart = specialCost.From;
                    }

                    if (interval.To <= specialCost.To)
                    {
                        intervalCosts.Add(CreateIntervalCost(intervalStart, interval.To, specialCost.HourCost));
                        intervalStart = interval.To;
                        break;
                    }
                    else
                    {
                        intervalCosts.Add(CreateIntervalCost(intervalStart, specialCost.To, specialCost.HourCost));
                        intervalStart = specialCost.To;
                    }
                }

                if (intervalStart < interval.To)
                    intervalCosts.Add(CreateIntervalCost(intervalStart, interval.To, _studioSettings.HourCost));
            }

            return intervalCosts;
        }

        private IntervalCostDto CreateIntervalCost(DateTime from, DateTime to, double hourCost)
        {
            TimeSpan diff = to - from;
            return
                new IntervalCostDto
                {
                    From = from,
                    To = to,
                    Cost = (to - from).TotalHours * hourCost
                };
        }

        private ICollection<Interval> ParseToIntervals(DateTime from, DateTime to)
        {
            var intervals = new Collection<Interval>();
            var intervalStart = from;
            for (DateTime i = from.Date; i < to; i = i.AddDays(1))
            {
                var intervalEnd = i.AddDays(1);
                if (to < intervalEnd)
                    intervalEnd = to;
                
                intervals.Add(new Interval
                {
                    From = intervalStart,
                    To =  intervalEnd,
                    DayType = DetermineDayType(intervalStart)
                });
                intervalStart = intervalEnd;
            }
            return intervals;
        }

        private DiscountDayTypeEnum DetermineDayType(DateTime date)
        {
            if (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday)
                return DiscountDayTypeEnum.Weekend;
            else
                return DiscountDayTypeEnum.Workday;
        }

        class Interval
        {
            public DateTime From { get; set; }
            public DateTime To { get; set; }
            public DiscountDayTypeEnum DayType { get; set; }
        }
        
    }
}