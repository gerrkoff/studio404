using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Services.Implementation;
using Moq;
using System;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using System.Collections.Generic;
using System.Linq;
using Studio404.Common.Enums;
using Studio404.Services.Interface;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class CostEvaluationServiceTest
    {   
        private readonly DateTime _anchor = DateTime.Today;
        private IDateService _dateService;
        
        [TestInitialize]
        public void Init()
        {
            var dateMock = new Mock<IDateService>();
            dateMock.Setup(x => x.NowUtc).Returns(_anchor);
            _dateService = dateMock.Object;
        }
        
        [TestMethod]
        public void EvaluateBookingCost()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true}
            ), PromoCodeRepo(), _dateService);

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(20), string.Empty).TotalCost;

            Assert.AreEqual(1000, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_24h()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true}
            ), PromoCodeRepo(), _dateService);

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(24), string.Empty).TotalCost;

            Assert.AreEqual(1400, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_36h()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true}
            ), PromoCodeRepo(), _dateService);

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(36), string.Empty).TotalCost;

            Assert.AreEqual(2600, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_1_5h()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true}
            ), PromoCodeRepo(), _dateService);

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(11).AddMinutes(30), string.Empty).TotalCost;

            Assert.AreEqual(150, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_1_3h()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true}
            ), PromoCodeRepo(), _dateService);

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(11).AddMinutes(18), string.Empty).TotalCost;

            Assert.AreEqual(130, result);
        }
        
        [TestMethod]
        public void SpecialCosts_WorkdaySimple()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true},
                new HourCostEntity {Start = 10, End = 17, DayType = DiscountDayTypeEnum.Workday, Cost = 50}
            ), PromoCodeRepo(), _dateService);

            var date = new DateTime(2018, 6, 4);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(10), date.AddHours(18), string.Empty).TotalCost;

            Assert.AreEqual(400, result);
        }
        
        [TestMethod]
        public void SpecialCosts_MixDays()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 1000, IsGeneral = true},
                new HourCostEntity {Start = 12, End = 14, DayType = DiscountDayTypeEnum.Weekend | DiscountDayTypeEnum.Workday, Cost = 250},
                new HourCostEntity {Start = 17, End = 20, DayType = DiscountDayTypeEnum.Workday, Cost = 500},
                new HourCostEntity {Start = 15, End = 19, DayType = DiscountDayTypeEnum.Weekend, Cost = 750}
            ), PromoCodeRepo(), _dateService);

            var date = new DateTime(2018, 6, 8);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(10), date.AddHours(23).AddDays(1), string.Empty).TotalCost;

            // 2000
            // 750
            // 2000
            // 2000
            // 15000
            // 750
            // 3750
            // 3000
            Assert.AreEqual(29250, result);
        }
        
        [TestMethod]
        public void SpecialCosts_StartBetweenIntervals()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 1000, IsGeneral = true},
                new HourCostEntity {Start = 12, End = 14, DayType = DiscountDayTypeEnum.Weekend | DiscountDayTypeEnum.Workday, Cost = 250},
                new HourCostEntity {Start = 17, End = 20, DayType = DiscountDayTypeEnum.Workday, Cost = 500}
            ), PromoCodeRepo(), _dateService);

            var date = new DateTime(2018, 6, 8);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(16), date.AddHours(20), string.Empty).TotalCost;

            // 1000
            // 1500
            Assert.AreEqual(2500, result);
        }
        
        [TestMethod]
        public void SpecialCosts_StartEndBetweenIntervals()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 1000, IsGeneral = true},
                new HourCostEntity {Start = 12, End = 14, DayType = DiscountDayTypeEnum.Weekend | DiscountDayTypeEnum.Workday, Cost = 250},
                new HourCostEntity {Start = 17, End = 20, DayType = DiscountDayTypeEnum.Workday, Cost = 500}
            ), PromoCodeRepo(), _dateService);

            var date = new DateTime(2018, 6, 8);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(16), date.AddHours(17), string.Empty).TotalCost;

            Assert.AreEqual(1000, result);
        }
        
        [TestMethod]
        public void SpecialCosts_TwoIntervalsSameTime()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 1000, IsGeneral = true},
                new HourCostEntity {Start = 12, End = 16, DayType = DiscountDayTypeEnum.Weekend | DiscountDayTypeEnum.Workday, Cost = 500},
                new HourCostEntity {Start = 13, End = 18, DayType = DiscountDayTypeEnum.Workday, Cost = 250}
            ), PromoCodeRepo(), _dateService);

            var date = new DateTime(2018, 6, 8);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(10), date.AddHours(20), string.Empty).TotalCost;

            // 2000
            // 2500
            // 500
            // 1000
            Assert.AreEqual(6000, result);
        }
        
        [TestMethod]
        public void PromoCode_WithSpecialCosts()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true},
                new HourCostEntity {Start = 10, End = 17, DayType = DiscountDayTypeEnum.Workday, Cost = 50}
            ), PromoCodeRepo(new PromoCodeEntity{Code = "promo", Discount = 27, From = _anchor, To = _anchor}),
                _dateService);

            var date = new DateTime(2018, 6, 4);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(8), date.AddHours(20), "promo").TotalCost;

            Assert.AreEqual(584, result);
        }
        
        [TestMethod]
        public void PromoCode_IgnoreIfExpired()
        {
            var costEvaluationService = new CostEvaluationService(
                HourCostsRepo(new HourCostEntity {Cost = 100, IsGeneral = true}),
                PromoCodeRepo(new PromoCodeEntity {Code = "promo", Discount = 27, From = _anchor.AddDays(-1), To = _anchor.AddDays(-1)}),
                _dateService);

            var date = new DateTime(2018, 6, 4);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(10), date.AddHours(12), "promo").TotalCost;

            Assert.AreEqual(200, result);
        }
        
        [TestMethod]
        public void PromoCode_IgnoreExpiredAndUseNext()
        {
            var costEvaluationService = new CostEvaluationService(
                HourCostsRepo(new HourCostEntity {Cost = 100, IsGeneral = true}),
                PromoCodeRepo(new PromoCodeEntity {Code = "promo", Discount = 27, From = _anchor.AddDays(-1), To = _anchor.AddDays(-1)},
                              new PromoCodeEntity {Code = "promo", Discount = 10, From = _anchor, To = _anchor}),
                _dateService);

            var date = new DateTime(2018, 6, 4);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(10), date.AddHours(12), "promo").TotalCost;

            Assert.AreEqual(180, result);
        }

        private IRepository<HourCostEntity> HourCostsRepo(params HourCostEntity[] hourCosts)
        {
            var repo = new Mock<IRepository<HourCostEntity>>();
            repo.Setup(x => x.GetAll()).Returns((new List<HourCostEntity>(hourCosts)).AsQueryable());
            return repo.Object;
        }
        
        private IRepository<PromoCodeEntity> PromoCodeRepo(params PromoCodeEntity[] promoCodes)
        {
            var repo = new Mock<IRepository<PromoCodeEntity>>();
            repo.Setup(x => x.GetAll()).Returns((new List<PromoCodeEntity>(promoCodes)).AsQueryable());
            return repo.Object;
        }
    }
}
