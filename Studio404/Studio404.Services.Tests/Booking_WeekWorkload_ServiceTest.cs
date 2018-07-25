using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Services.Implementation;
using Moq;
using Studio404.Services.Interface;
using System;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using System.Collections.Generic;
using System.Linq;
using Studio404.Dto.Booking;
using Studio404.Common.Enums;
using Studio404.Dto.Schedule;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class Booking_WeekWorkload_ServiceTest
	{
		ICostEvaluationService _costEvaluationService;

        [TestInitialize]
        public void Init()
        {
	        var costMock = new Mock<ICostEvaluationService>();
	        costMock.Setup(x => x.GetSchedule()).Returns(new StudioSchedule
	        {
		        Start = 0,
		        End = 23
	        });
	        _costEvaluationService = costMock.Object;
        }

        [TestMethod]
        public void GetWeekWorkload_NoBooking()
        {   
            var bookingService = new BookingService(CreateRepo(), null, _costEvaluationService, null, null);

            IList<DayWorkloadDto> result = bookingService.GetWeekWorkload(DateTime.Today).ToList();

            Assert.AreEqual(7, result.Count);
			foreach (var day in result)
			{
				Assert.AreEqual(24, day.FreeHours.Length);
			}
        }

		[TestMethod]
		public void GetWeekWorkload_SimpleBooking()
		{
			var repo = CreateRepo(
				new BookingEntity { From = Dth(10), To = Dth(12) },
				new BookingEntity { From = Dth(16), To = Dth(20) });
			var bookingService = new BookingService(repo, null, _costEvaluationService, null, null);

			IList<DayWorkloadDto> result = bookingService.GetWeekWorkload(DateTime.Today).ToList();

			Assert.AreEqual(7, result.Count);
			Assert.AreEqual(18, result[0].FreeHours.Length);
			Assert.IsTrue(result[0].FreeHours.All(x =>
				x < 10 ||
				x >= 12 && x < 16 ||
				x >= 20
			));
			for (int i = 1; i < result.Count; i++)
			{
				Assert.AreEqual(24, result[i].FreeHours.Length);
			}
		}

		[TestMethod]
		public void GetWeekWorkload_SimpleBookingLastDay()
		{
			var repo = CreateRepo(
				new BookingEntity { From = Dth(10, 6), To = Dth(12, 6) },
				new BookingEntity { From = Dth(16, 6), To = Dth(20, 6) });
			var bookingService = new BookingService(repo, null, _costEvaluationService, null, null);

			IList<DayWorkloadDto> result = bookingService.GetWeekWorkload(DateTime.Today).ToList();

			Assert.AreEqual(7, result.Count);
			Assert.AreEqual(18, result[6].FreeHours.Length);
			Assert.IsTrue(result[6].FreeHours.All(x =>
				x < 10 ||
				x >= 12 && x < 16 ||
				x >= 20
			));
			for (int i = 0; i < result.Count - 1; i++)
			{
				Assert.AreEqual(24, result[i].FreeHours.Length);
			}
		}

		[TestMethod]
		public void GetWeekWorkload_IgnoreSpecialAndCanceled()
		{
			var repo = CreateRepo(
				new BookingEntity { From = Dth(10), To = Dth(12), Status = BookingStatusEnum.Canceled },
				new BookingEntity { From = Dth(16), To = Dth(20), Status = BookingStatusEnum.Special });
			var bookingService = new BookingService(repo, null, _costEvaluationService, null, null);

			IList<DayWorkloadDto> result = bookingService.GetWeekWorkload(DateTime.Today).ToList();

			Assert.AreEqual(7, result.Count);
			foreach (var day in result)
			{
				Assert.AreEqual(24, day.FreeHours.Length);
			}
		}

		[TestMethod]
		public void GetWeekWorkload_BookingOutsideOfTheWeek()
		{
			var repo = CreateRepo(
				new BookingEntity { From = Dth(12, -1), To = Dth(1) },
				new BookingEntity { From = Dth(23, 6), To = Dth(12, 7) });
			var bookingService = new BookingService(repo, null, _costEvaluationService, null, null);

			IList<DayWorkloadDto> result = bookingService.GetWeekWorkload(DateTime.Today).ToList();

			Assert.AreEqual(7, result.Count);
			Assert.AreEqual(23, result[0].FreeHours.Length);
			Assert.IsTrue(result[0].FreeHours.All(x => x >= 1));
			Assert.AreEqual(23, result[6].FreeHours.Length);
			Assert.IsTrue(result[6].FreeHours.All(x => x < 23));
			for (int i = 1; i < result.Count - 1; i++)
			{
				Assert.AreEqual(24, result[i].FreeHours.Length);
			}
		}

		[TestMethod]
		public void GetWeekWorkload_BorderedBookingOutsideOfTheWeek()
		{
			var repo = CreateRepo(
				new BookingEntity { From = Dth(12, -1), To = Dth(0) },
				new BookingEntity { From = Dth(24, 6), To = Dth(12, 7) });
			var bookingService = new BookingService(repo, null, _costEvaluationService, null, null);

			IList<DayWorkloadDto> result = bookingService.GetWeekWorkload(DateTime.Today).ToList();

			Assert.AreEqual(7, result.Count);
			foreach (var day in result)
			{
				Assert.AreEqual(24, day.FreeHours.Length);
			}
		}

		[TestMethod]
		public void GetWeekWorkload_AllDayBooking()
		{
			var repo = CreateRepo(
				new BookingEntity { From = Dth(0), To = Dth(24) },
				new BookingEntity { From = Dth(0, 1), To = Dth(0, 2) });
			var bookingService = new BookingService(repo, null, _costEvaluationService, null, null);

			IList<DayWorkloadDto> result = bookingService.GetWeekWorkload(DateTime.Today).ToList();

			Assert.AreEqual(7, result.Count);
			Assert.AreEqual(0, result[0].FreeHours.Length);
			Assert.AreEqual(0, result[1].FreeHours.Length);
			for (int i = 2; i < result.Count; i++)
			{
				Assert.AreEqual(24, result[i].FreeHours.Length);
			}
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
