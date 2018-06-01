using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Services.Implementation;
using Moq;
using Studio404.Services.Interface;
using System;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using System.Collections.Generic;
using System.Linq;
using Studio404.Common.Enums;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class CheckServiceTest
    {
        [TestMethod]
        public void SimpleCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { From = DateTimeHour(9), To = DateTimeHour(11), Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void LowRangeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { From = DateTimeHour(10), To = DateTimeHour(11), Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void HighRangeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { From = DateTimeHour(9), To = DateTimeHour(10), Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void EqualOneHourCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { From = DateTimeHour(10), To = DateTimeHour(10), Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void WrongTimeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { From = DateTimeHour(11), To = DateTimeHour(11), Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

            Assert.IsFalse(result);
        }

        [TestMethod]
        public void WrongCodeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { From = DateTimeHour(9), To = DateTimeHour(11), Code = "2" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

            Assert.IsFalse(result);
        }

        [TestMethod]
        public void ShiftCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { From = DateTimeHour(12), To = DateTimeHour(12), Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(120, "1");

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void ShiftRangeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { From = DateTimeHour(13), To = DateTimeHour(15), Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(240, "1");

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void ShiftNegativeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { From = DateTimeHour(6), To = DateTimeHour(6), Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(-240, "1");

            Assert.IsTrue(result);
        }

		[TestMethod]
		public void SpecialCheck()
		{
			IDateService date = CreateDateService();
			IRepository<BookingEntity> repo = CreateRepo(
				new BookingEntity { From = DateTimeHour(9), To = DateTimeHour(11), Code = "1", Status = BookingStatusEnum.Paid },
				new BookingEntity { From = DateTimeHour(-30), To = DateTimeHour(30), Code = "2", Status = BookingStatusEnum.Special });
			var check = new CheckService(repo, date);
			
			Assert.IsTrue(check.Check(0, "1"));
			Assert.IsTrue(check.Check(0, "2"));
		}

		private IDateService CreateDateService()
        {
            var date = new Mock<IDateService>();
            date.Setup(x => x.NowUtc).Returns(DateTime.Today.AddHours(10));
            return date.Object;
        }

        private IRepository<BookingEntity> CreateRepo(params BookingEntity[] bookings)
        {
            var repo = new Mock<IRepository<BookingEntity>>();
            repo.Setup(x => x.GetAll()).Returns((new List<BookingEntity>(bookings)).AsQueryable());
            return repo.Object;
        }

        private DateTime DateTimeHour(int hour) 
        {
            return DateTime.Today.AddHours(hour);
        }
    }
}
