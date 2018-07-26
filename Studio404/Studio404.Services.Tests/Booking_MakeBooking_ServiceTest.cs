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
using Studio404.Dto.Account;
using Studio404.Common.Exceptions;
using Studio404.Dto.CostInfo;
using Studio404.Dto.Schedule;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class Booking_MakeBooking_ServiceTest
	{
		ICostEvaluationService _costEvaluationService;
		IDateService _dateService;

		[TestInitialize]
        public void Init()
        {
            var costEvaluationServiceMock = new Mock<ICostEvaluationService>();
	        costEvaluationServiceMock.Setup(x =>
			        x.EvaluateBookingCost(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<string>()))
		        .Returns(new BookingCostDto {TotalCost = 100});
	        costEvaluationServiceMock.Setup(x => x.GetSchedule()).Returns(new StudioSchedule());
			_costEvaluationService = costEvaluationServiceMock.Object;

			var dateServiceMock = new Mock<IDateService>();
			dateServiceMock.Setup(x => x.NowUtc).Returns(DateTime.UtcNow.Date);
			_dateService = dateServiceMock.Object;
		}

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void MakeBooking_PhoneNotConfirmed()
		{
			var bookingService = new BookingService(CreateRepo(), null, _costEvaluationService, null, _dateService);

			var bookingInfo = new MakeBookingInfoDto
			{
				Date = DateTime.UtcNow.Date.AddDays(1),
				From = 10,
				To = 20
			};
			bookingService.MakeBooking(bookingInfo, new CurrentUser());
		}

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void MakeBooking_BookingStartsEarlier()
		{
			var dateServiceMock = new Mock<IDateService>();
			dateServiceMock.Setup(x => x.NowUtc).Returns(DateTime.UtcNow.Date.AddDays(1));
			_dateService = dateServiceMock.Object;

			var bookingService = new BookingService(CreateRepo(), null, _costEvaluationService, null, _dateService);

			var bookingInfo = new MakeBookingInfoDto
			{
				Date = DateTime.UtcNow.Date,
				From = 0,
				To = 20
			};

			bookingService.MakeBooking(bookingInfo, new CurrentUser { Phone = "1" });
		}

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void MakeBooking_SuchTimeOccupied1()
		{
			TestOccupation(new BookingEntity { From = Dth(15), To = Dth(17) });
		}

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void MakeBooking_SuchTimeOccupied2()
		{
			TestOccupation(new BookingEntity { From = Dth(10), To = Dth(21) });
		}

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void MakeBooking_SuchTimeOccupied3()
		{
			TestOccupation(new BookingEntity { From = Dth(10), To = Dth(15) },
							new BookingEntity { From = Dth(15), To = Dth(21) });
		}

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void MakeBooking_SuchTimeOccupied4()
		{
			TestOccupation(new BookingEntity { From = Dth(5), To = Dth(22) });
		}

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void MakeBooking_SuchTimeOccupied5()
		{
			TestOccupation(new BookingEntity { From = Dth(5), To = Dth(15) });
		}

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void MakeBooking_SuchTimeOccupied6()
		{
			TestOccupation(new BookingEntity { From = Dth(15), To = Dth(22) });
		}

		[TestMethod]
		public void MakeBooking_Normal()
		{
			var bookingService =
				new BookingService(
					CreateRepo(
						new BookingEntity {From = Dth(10), To = Dth(13)},
						new BookingEntity {From = Dth(16), To = Dth(20)}),
					null, _costEvaluationService, null, _dateService);

			var bookingInfo = new MakeBookingInfoDto
			{
				Date = DateTime.UtcNow.Date,
				From = 13,
				To = 15
			};
			bookingService.MakeBooking(bookingInfo, new CurrentUser { Phone = "1", UserId = "SomeUser" });
		}

		[TestMethod]
		public void MakeBooking_CheckSaving()
		{
			BookingEntity saveOutput = null;

			var repo = new Mock<IRepository<BookingEntity>>();
			repo.Setup(x => x.GetAll()).Returns((new List<BookingEntity>()).AsQueryable());
			repo.Setup(x => x.Save(It.IsAny<BookingEntity>())).Callback<BookingEntity>(x => saveOutput = x);

			var bookingService = new BookingService(repo.Object, null, _costEvaluationService, null, _dateService);

			var bookingInfo = new MakeBookingInfoDto
			{
				Date = DateTime.UtcNow.Date,
				From = 13,
				To = 15
			};
			bookingService.MakeBooking(bookingInfo, new CurrentUser { Phone = "1", UserId = "SomeUser" });

			Assert.AreEqual(DateTime.UtcNow.Date.AddHours(13), saveOutput.From);
			Assert.AreEqual(DateTime.UtcNow.Date.AddHours(16), saveOutput.To);
			Assert.AreEqual(BookingStatusEnum.Unpaid, saveOutput.Status);
			Assert.IsNotNull(saveOutput.Guid);
			Assert.AreEqual(100, saveOutput.Cost);
			Assert.AreEqual("SomeUser", saveOutput.UserId);
			Assert.AreEqual(null, saveOutput.PromoCodeId);
		}
		
		[TestMethod]
		public void MakeBooking_CheckSavingPromoCode()
		{
			BookingEntity saveOutput = null;

			var repo = new Mock<IRepository<BookingEntity>>();
			repo.Setup(x => x.GetAll()).Returns((new List<BookingEntity>()).AsQueryable());
			repo.Setup(x => x.Save(It.IsAny<BookingEntity>())).Callback<BookingEntity>(x => saveOutput = x);

			var costEvaluationServiceMock = new Mock<ICostEvaluationService>();
			costEvaluationServiceMock.Setup(x =>
					x.EvaluateBookingCost(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<string>()))
				.Returns(new BookingCostDto {TotalCost = 100, PromoCode = new PromoCodeInfoDto {Id = 100500}});
			
			var bookingService = new BookingService(repo.Object, null, costEvaluationServiceMock.Object, null, _dateService);

			var bookingInfo = new MakeBookingInfoDto
			{
				Date = DateTime.UtcNow.Date,
				From = 13,
				To = 15
			};
			bookingService.MakeBooking(bookingInfo, new CurrentUser { Phone = "1" });

			Assert.AreEqual(100500, saveOutput.PromoCodeId);
		}

		private void TestOccupation(params BookingEntity[] bookings)
		{
			var bookingService = new BookingService(CreateRepo(bookings), null, _costEvaluationService, null, _dateService);

			var bookingInfo = new MakeBookingInfoDto
			{
				Date = DateTime.UtcNow.Date,
				From = 10,
				To = 20
			};

			bookingService.MakeBooking(bookingInfo, new CurrentUser { Phone = "1" });
		}

		private IRepository<BookingEntity> CreateRepo(params BookingEntity[] bookings)
		{
			var repo = new Mock<IRepository<BookingEntity>>();
			repo.Setup(x => x.GetAll()).Returns((new List<BookingEntity>(bookings)).AsQueryable());			
			return repo.Object;
		}

		private DateTime Dth(int hour, int day = 0)
		{
			return DateTime.UtcNow.Date.AddDays(day).AddHours(hour);
		}
	}
}
