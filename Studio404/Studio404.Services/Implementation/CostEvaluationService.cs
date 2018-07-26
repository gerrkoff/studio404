using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using AutoMapper;
using Microsoft.Extensions.Options;
using StackExchange.Redis;
using Studio404.Common.Enums;
using Studio404.Common.Settings;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Dto.Booking;
using Studio404.Dto.CostInfo;
using Studio404.Dto.Schedule;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class CostEvaluationService : ICostEvaluationService
    {
        private readonly IRepository<HourCostEntity> _hourCostRepository;
        private readonly IRepository<PromoCodeEntity> _promoCodeRepository;
        private readonly IDateService _dateService;

        public CostEvaluationService(IRepository<HourCostEntity> hourCostRepository,
            IRepository<PromoCodeEntity> promoCodeRepository, IDateService dateService)
        {
            _hourCostRepository = hourCostRepository;
            _promoCodeRepository = promoCodeRepository;
            _dateService = dateService;
        }

        public BookingCostDto EvaluateBookingCost(DateTime from, DateTime to, string promoCode)
        {
            StudioSchedule schedule = EvaluateStudioSchedule();
            PromoCodeInfoDto promoCodeInfo = EvaluatePromoCodeInfo(promoCode);

            var result = new BookingCostDto
            {
                PromoCode = promoCodeInfo
            };

            schedule.Cost *= promoCodeInfo.CostModifier;
            foreach (var scheduleSpecialCost in schedule.SpecialCosts)
            {
                scheduleSpecialCost.Cost *= promoCodeInfo.CostModifier;
            }

            if (schedule.SpecialCosts == null || schedule.SpecialCosts.Length == 0)
                return SetupIntervals(result, new[] {CreateIntervalCost(from, to, schedule.Cost)});

            ICollection<IntervalCostDto> intervalCosts = new Collection<IntervalCostDto>();
            ICollection<Interval> intervals = ParseToIntervals(from, to);
            foreach (var interval in intervals)
            {
                var specialCosts = schedule.SpecialCosts
                    .Where(x => x.DayType.HasFlag(interval.DayType))
                    .Select(x => new
                    {
                        From = interval.From.Date.AddHours(x.Start),
                        To = interval.From.Date.AddHours(x.End + 1),
                        x.Cost
                    })
                    .OrderBy(x => x.From);

                DateTime intervalStart = interval.From;
                foreach (var specialCost in specialCosts)
                {
                    if (intervalStart >= specialCost.To)
                        continue;

                    if (interval.To <= specialCost.From)
                    {
                        intervalCosts.Add(CreateIntervalCost(intervalStart, interval.To, schedule.Cost));
                        intervalStart = interval.To;
                        break;
                    }
                    
                    if (intervalStart < specialCost.From)
                    {
                        intervalCosts.Add(CreateIntervalCost(intervalStart, specialCost.From, schedule.Cost));
                        intervalStart = specialCost.From;
                    }

                    if (interval.To <= specialCost.To)
                    {
                        intervalCosts.Add(CreateIntervalCost(intervalStart, interval.To, specialCost.Cost));
                        intervalStart = interval.To;
                        break;
                    }
                    else
                    {
                        intervalCosts.Add(CreateIntervalCost(intervalStart, specialCost.To, specialCost.Cost));
                        intervalStart = specialCost.To;
                    }
                }

                if (intervalStart < interval.To)
                    intervalCosts.Add(CreateIntervalCost(intervalStart, interval.To, schedule.Cost));
            }

            return SetupIntervals(result, intervalCosts);
        }

        public StudioSchedule GetSchedule()
        {
            HourCostEntity general = _hourCostRepository.GetAll().Single(x => x.IsGeneral);
            return Mapper.Map<StudioSchedule>(general);
        }

        private IntervalCostDto CreateIntervalCost(DateTime from, DateTime to, double hourCost)
        {
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

        private StudioSchedule EvaluateStudioSchedule()
        {
            List<HourCostEntity> hourCosts = _hourCostRepository.GetAll().ToList();
            HourCostEntity general = hourCosts.Single(x => x.IsGeneral);

            var schedule = Mapper.Map<StudioSchedule>(general);
            schedule.SpecialCosts = hourCosts
                .Where(x => !x.IsGeneral)
                .Select(Mapper.Map<StudioSchedule.SpecialCost>)
                .ToArray();

            return schedule;
        }

        private PromoCodeInfoDto EvaluatePromoCodeInfo(string promoCode)
        {
            if (string.IsNullOrWhiteSpace(promoCode))
                return CreateDefaultPromoCodeInfo(promoCode);
            
            DateTime current = _dateService.NowUtc;
            promoCode = promoCode?.ToLower();
            var promoCodeEntity = _promoCodeRepository.GetAll()
                .FirstOrDefault(x => x.From <= current &&
                                     x.To >= current &&
                                     x.Code == promoCode);

            if (promoCodeEntity == null)
                return CreateDefaultPromoCodeInfo(promoCode);

            return Mapper.Map<PromoCodeInfoDto>(promoCodeEntity);
        }

        private PromoCodeInfoDto CreateDefaultPromoCodeInfo(string promoCode)
        {
            return new PromoCodeInfoDto
            {
                Id = null,
                Code = promoCode,
                CostModifier = 1,
                Info = "-"
            };
        }

        private BookingCostDto SetupIntervals(BookingCostDto bookingCost, ICollection<IntervalCostDto> intervals)
        {
            bookingCost.IntervalCosts = intervals;
            bookingCost.TotalCost = intervals.Select(x => x.Cost).Sum();
            return bookingCost;
        }

        class Interval
        {
            public DateTime From { get; set; }
            public DateTime To { get; set; }
            public DiscountDayTypeEnum DayType { get; set; }
        }
        
    }
}