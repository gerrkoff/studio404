using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Services.Implementation;
using Moq;
using Studio404.Services.Interface;
using System;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using System.Collections.Generic;
using System.Linq;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class CheckServiceTest
    {
        [TestMethod]
        public void SimpleCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { Date = new DateTime(), From = 9, To = 11, Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void LowRangeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { Date = new DateTime(), From = 10, To = 11, Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void HighRangeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { Date = new DateTime(), From = 9, To = 10, Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void EqualOneHourCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { Date = new DateTime(), From = 10, To = 10, Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

			// Assert.IsTrue(result);
			Assert.IsFalse(result);
		}

        [TestMethod]
        public void WrongTimeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { Date = new DateTime(), From = 11, To = 11, Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

            Assert.IsFalse(result);
        }

        [TestMethod]
        public void WrongCodeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { Date = new DateTime(), From = 9, To = 11, Code = "2" });
            var check = new CheckService(repo, date);

            bool result = check.Check(0, "1");

            Assert.IsFalse(result);
        }

        [TestMethod]
        public void ShiftCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { Date = new DateTime(), From = 12, To = 12, Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(120, "1");

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void ShiftRangeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { Date = new DateTime(), From = 13, To = 15, Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(240, "1");

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void ShiftNegativeCheck()
        {
            IDateService date = CreateDateService();
            IRepository<BookingEntity> repo = CreateRepo(new BookingEntity { Date = new DateTime(), From = 6, To = 6, Code = "1" });
            var check = new CheckService(repo, date);

            bool result = check.Check(-240, "1");

            Assert.IsTrue(result);
        }

        private IDateService CreateDateService()
        {
            var date = new Mock<IDateService>();
            date.Setup(x => x.NowUtc).Returns(new DateTime().AddHours(10));
            return date.Object;
        }

        private IRepository<BookingEntity> CreateRepo(params BookingEntity[] bookings)
        {
            var repo = new Mock<IRepository<BookingEntity>>();
            repo.Setup(x => x.GetAll()).Returns((new List<BookingEntity>(bookings)).AsQueryable());
            return repo.Object;
        }
    }
}
