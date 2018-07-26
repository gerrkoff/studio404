using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Services.Implementation;
using System;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class DateServiceTest
    {
        private readonly DateTime _dateTime = new DateTime(2018, 7, 1, 17, 23, 40);
        
        [TestMethod]
        public void ToShortDate()
        {
            var dateService = new DateService();
            Assert.AreEqual("01 июля 2018", dateService.ToShortDate(_dateTime));
        }
        
        [TestMethod]
        public void ToShortTime()
        {
            var dateService = new DateService();
            Assert.AreEqual("17:23", dateService.ToShortTime(_dateTime));
        }

        [TestMethod]
        public void ToShortDateTime()
        {
            var dateService = new DateService();
            Assert.AreEqual("01 июля 2018 17:23", dateService.ToShortDateTime(_dateTime));
        }
        
        [TestMethod]
        public void CreateUnspecifiedDateTime()
        {
            var dateService = new DateService();
            DateTime result = dateService.CreateUnspecifiedDateTime(DateTime.Now, 10, 35, 57);
            Assert.AreEqual(DateTime.Today, result.Date);
            Assert.AreEqual(10, result.Hour);
            Assert.AreEqual(35, result.Minute);
            Assert.AreEqual(57, result.Second);
            Assert.AreEqual(DateTimeKind.Unspecified, result.Kind);
        }
    }
}
