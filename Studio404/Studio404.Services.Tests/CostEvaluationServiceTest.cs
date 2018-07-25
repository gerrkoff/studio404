using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Services.Implementation;
using Moq;
using System;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using System.Collections.Generic;
using System.Linq;
using Studio404.Common.Enums;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class CostEvaluationServiceTest
    {   
        [TestMethod]
        public void EvaluateBookingCost()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true}
            ));

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(20));

            Assert.AreEqual(1000, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_24h()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true}
            ));

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(24));

            Assert.AreEqual(1400, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_36h()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true}
            ));

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(36));

            Assert.AreEqual(2600, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_1_5h()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true}
            ));

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(11).AddMinutes(30));

            Assert.AreEqual(150, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_1_3h()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true}
            ));

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(11).AddMinutes(18));

            Assert.AreEqual(130, result);
        }
        
        [TestMethod]
        public void SpecialCosts_WorkdaySimple()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 100, IsGeneral = true},
                new HourCostEntity {Start = 10, End = 17, DayType = DiscountDayTypeEnum.Workday, Cost = 50}
            ));

            var date = new DateTime(2018, 6, 4);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(10), date.AddHours(18));

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
            ));

            var date = new DateTime(2018, 6, 8);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(10), date.AddHours(23).AddDays(1));

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
            ));

            var date = new DateTime(2018, 6, 8);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(16), date.AddHours(20));

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
            ));

            var date = new DateTime(2018, 6, 8);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(16), date.AddHours(17));

            Assert.AreEqual(1000, result);
        }
        
        [TestMethod]
        public void SpecialCosts_TwoIntervalsSameTime()
        {
            var costEvaluationService = new CostEvaluationService(HourCostsRepo(
                new HourCostEntity {Cost = 1000, IsGeneral = true},
                new HourCostEntity {Start = 12, End = 16, DayType = DiscountDayTypeEnum.Weekend | DiscountDayTypeEnum.Workday, Cost = 500},
                new HourCostEntity {Start = 13, End = 18, DayType = DiscountDayTypeEnum.Workday, Cost = 250}
            ));

            var date = new DateTime(2018, 6, 8);
            double result = costEvaluationService.EvaluateBookingCost(date.AddHours(10), date.AddHours(20));

            // 2000
            // 2500
            // 500
            // 1000
            Assert.AreEqual(6000, result);
        }

        private IRepository<HourCostEntity> HourCostsRepo(params HourCostEntity[] hourCosts)
        {
            var repo = new Mock<IRepository<HourCostEntity>>();
            repo.Setup(x => x.GetAll()).Returns((new List<HourCostEntity>(hourCosts)).AsQueryable());
            return repo.Object;
        }
    }
}
