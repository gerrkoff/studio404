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
using Microsoft.Extensions.Logging;
using Studio404.Common.Enums;
using System.Globalization;

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
