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
        [TestMethod]
        public void EvaluateBookingCost()
        {
            var optionsMock = new Mock<IOptions<StudioSettings>>();
            optionsMock.Setup(x => x.Value).Returns(new StudioSettings
            {
                HourCost = 250
            });
            var costEvaluationService = new CostEvaluationService(optionsMock.Object);

            double result = costEvaluationService.EvaluateBookingCost(DateTime.Today, 10, 19);

            Assert.AreEqual(2500, result);
        }
    }
}
