using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Services.Implementation;
using Moq;
using Studio404.Services.Interface;
using System;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;
using Studio404.Common.Settings;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class CostEvaluationServiceTest
    {
        IOptions<StudioSettings> options;

        [TestInitialize]
        public void Init()
        {
            var optionsMock = new Mock<IOptions<StudioSettings>>();
            optionsMock.Setup(x => x.Value).Returns(new StudioSettings
            {
                HourCost = 100
            });
            options = optionsMock.Object;
        }

        [TestMethod]
        public void EvaluateBookingCost()
        {   
            var costEvaluationService = new CostEvaluationService(options);

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(20));

            Assert.AreEqual(1000, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_24h()
        {
            var costEvaluationService = new CostEvaluationService(options);

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(24));

            Assert.AreEqual(1400, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_36h()
        {
            var costEvaluationService = new CostEvaluationService(options);

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(36));

            Assert.AreEqual(2600, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_1_5h()
        {
            var costEvaluationService = new CostEvaluationService(options);

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(11).AddMinutes(30));

            Assert.AreEqual(150, result);
        }

        [TestMethod]
        public void EvaluateBookingCost_1_3h()
        {
            var costEvaluationService = new CostEvaluationService(options);

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today.AddHours(10), DateTime.Today.AddHours(11).AddMinutes(18));

            Assert.AreEqual(130, result);
        }
    }
}
