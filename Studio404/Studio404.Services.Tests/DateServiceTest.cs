using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Services.Implementation;
using System;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class DateServiceTest
    {
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
