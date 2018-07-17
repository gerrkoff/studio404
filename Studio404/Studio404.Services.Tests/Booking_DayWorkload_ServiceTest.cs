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
using Studio404.Dto.Booking;
using Studio404.Common.Enums;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class Booking_DayWorkload_ServiceTest
	{
        IOptions<StudioSettings> options;

        [TestInitialize]
        public void Init()
        {
            var optionsMock = new Mock<IOptions<StudioSettings>>();
			optionsMock.Setup(x => x.Value).Returns(new StudioSettings
			{
				ScheduleStart = 0,
				ScheduleEnd = 23
            });
            options = optionsMock.Object;
        }

        [TestMethod]
        public void GetDayWorkload_NoBooking()
        {   
            var bookingService = new BookingService(CreateRepo(), options, null, null, null, null);

            IList<DayHourDto> result = bookingService.GetDayWorkload(DateTime.Today).ToList();

            Assert.AreEqual(24, result.Count);
			Assert.IsTrue(result.All(x => x.Available));
        }
		
		[TestMethod]
		public void GetDayWorkload_SimpleBooking()
		{
			var repo = CreateRepo(
				new BookingEntity { From = Dth(10), To = Dth(12) },
				new BookingEntity { From = Dth(16), To = Dth(20) });
			var bookingService = new BookingService(repo, options, null, null, null, null);

			IList<DayHourDto> result = bookingService.GetDayWorkload(DateTime.Today).ToList();

			Assert.AreEqual(24, result.Count);
			Assert.AreEqual(6, result.Count(x => !x.Available));
			Assert.IsTrue(result
				.Where(x => !x.Available)
				.Select(x => x.Hour)
				.All(x =>
					x >= 10 && x < 12 ||
					x >= 16 && x < 20
			));
		}

		[TestMethod]
		public void GetDayWorkload_IgnoreSpecialAndCanceled()
		{
			var repo = CreateRepo(
				new BookingEntity { From = Dth(10), To = Dth(12), Status = BookingStatusEnum.Canceled },
				new BookingEntity { From = Dth(16), To = Dth(20), Status = BookingStatusEnum.Special });
			var bookingService = new BookingService(repo, options, null, null, null, null);

			IList<DayHourDto> result = bookingService.GetDayWorkload(DateTime.Today).ToList();

			Assert.AreEqual(24, result.Count);
			Assert.IsTrue(result.All(x => x.Available));
		}

		[TestMethod]
		public void GetDayWorkload_BookingOutsideOfTheDay()
		{
			var repo = CreateRepo(
				new BookingEntity { From = Dth(12, -1), To = Dth(1) },
				new BookingEntity { From = Dth(23), To = Dth(12, 1) });
			var bookingService = new BookingService(repo, options, null, null, null, null);

			IList<DayHourDto> result = bookingService.GetDayWorkload(DateTime.Today).ToList();

			Assert.AreEqual(24, result.Count);
			Assert.AreEqual(2, result.Count(x => !x.Available));
			Assert.IsTrue(result
				.Where(x => !x.Available)
				.Select(x => x.Hour)
				.All(x =>
					x == 0 || x == 23
			));
		}

		[TestMethod]
		public void GetDayWorkload_BorderedBookingOutsideOfTheDay()
		{
			var repo = CreateRepo(
				new BookingEntity { From = Dth(12, -1), To = Dth(0) },
				new BookingEntity { From = Dth(24), To = Dth(12, 1) });
			var bookingService = new BookingService(repo, options, null, null, null, null);

			IList<DayHourDto> result = bookingService.GetDayWorkload(DateTime.Today).ToList();

			Assert.AreEqual(24, result.Count);
			Assert.IsTrue(result.All(x => x.Available));
		}
		
		[TestMethod]
		public void GetDayWorklo_AllDayBooking()
		{
			var repo = CreateRepo(new BookingEntity { From = Dth(0), To = Dth(24) });
			var bookingService = new BookingService(repo, options, null, null, null, null);

			IList<DayHourDto> result = bookingService.GetDayWorkload(DateTime.Today).ToList();

			Assert.AreEqual(24, result.Count);
			Assert.IsTrue(result.All(x => !x.Available));
		}

		private IRepository<BookingEntity> CreateRepo(params BookingEntity[] bookings)
		{
			var repo = new Mock<IRepository<BookingEntity>>();
			repo.Setup(x => x.GetAll()).Returns((new List<BookingEntity>(bookings)).AsQueryable());
			return repo.Object;
		}

		private DateTime Dth(int hour, int day = 0)
		{
			return DateTime.Today.AddDays(day).AddHours(hour);
		}
	}
}
