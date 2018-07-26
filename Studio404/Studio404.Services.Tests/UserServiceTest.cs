using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Services.Implementation;
using Moq;
using Studio404.Services.Interface;
using System;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using System.Collections.Generic;
using System.Linq;
using Studio404.Dto.Account;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class UserServiceTest
    {
        private readonly CurrentUser _user = new CurrentUser {UserId = "id"};
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
        public void GetBookings_Positive()
        {
            var repo = CreateRepo(
                new BookingEntity {To = _anchor, UserId = _user.UserId},
                new BookingEntity {To = _anchor.AddDays(1), UserId = _user.UserId},
                new BookingEntity {To = _anchor.AddDays(100), UserId = _user.UserId});
            var service = new UserService(repo, _dateService);

            var result = service.GetUserBookings(_user);

            Assert.AreEqual(3, result.Count());
        }
        
        [TestMethod]
        public void GetBookings_IgnoreNonUserBookings()
        {
            var repo = CreateRepo(
                new BookingEntity {To = _anchor, UserId = _user.UserId},
                new BookingEntity {To = _anchor, UserId = _user.UserId + "!"},
                new BookingEntity {To = _anchor, UserId = _user.UserId});
            var service = new UserService(repo, _dateService);

            var result = service.GetUserBookings(_user);

            Assert.AreEqual(2, result.Count());
        }
        
        [TestMethod]
        public void GetBookings_YesterdaysBookingStillIncluded()
        {
            var repo = CreateRepo(
                new BookingEntity {To = _anchor.AddDays(-1).AddMilliseconds(1), UserId = _user.UserId});
            var service = new UserService(repo, _dateService);

            var result = service.GetUserBookings(_user);

            Assert.AreEqual(1, result.Count());
        }
        
        [TestMethod]
        public void GetBookings_NonYesterdaysBookingExcluded()
        {
            var repo = CreateRepo(new BookingEntity {To = _anchor.AddDays(-1), UserId = _user.UserId});
            var service = new UserService(repo, _dateService);

            var result = service.GetUserBookings(_user);

            Assert.AreEqual(0, result.Count());
        }

        private IRepository<BookingEntity> CreateRepo(params BookingEntity[] bookings)
        {
            var repo = new Mock<IRepository<BookingEntity>>();
            repo.Setup(x => x.GetAll()).Returns((new List<BookingEntity>(bookings)).AsQueryable());
            return repo.Object;
        }
    }
}
