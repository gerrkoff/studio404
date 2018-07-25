using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Services.Implementation;
using Moq;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Common.Enums;
using Studio404.Dto.UserManager;
using Studio404.Common.Exceptions;

namespace Studio404.Services.Tests
{
	[TestClass]
    public class HourCostManager_SaveHourCost_ServiceTest
	{
        [TestMethod]
        public void SaveHourCost_Insert()
        {
			var repo = CreateRepo(0, null);
            var service = new HourCostManagerService(repo.Object);

			HourCostDto result = service.SaveHourCost(new HourCostUpdateDto
			{
				Id = -1,
				Cost = 250,
				DayType = DiscountDayTypeEnum.Weekend | DiscountDayTypeEnum.Workday,
				Start = 10,
				End = 20
			});

			repo.Verify(x => x.Save(It.IsAny<HourCostEntity>()));
			Assert.AreEqual(0, result.Id);
			Assert.AreEqual(250, result.Cost);
			Assert.AreEqual(DiscountDayTypeEnum.Weekend | DiscountDayTypeEnum.Workday, result.DayType);
			Assert.AreEqual(10, result.Start);
			Assert.AreEqual(20, result.End);
        }

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void SaveHourCost_Update_NoEntity()
		{
			var repo = CreateRepo(100, null);
			var service = new HourCostManagerService(repo.Object);

			HourCostDto result = service.SaveHourCost(new HourCostUpdateDto
			{
				Id = 100
			});
		}

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void SaveHourCost_Update_EntityAlreadyDeleted()
		{
			var repo = CreateRepo(100, new HourCostEntity
			{
				IsDeleted = true
			});
			var service = new HourCostManagerService(repo.Object);

			HourCostDto result = service.SaveHourCost(new HourCostUpdateDto
			{
				Id = 100
			});
		}

		[TestMethod]
		public void SaveHourCost_Update_EntityIsGeneral()
		{
			var repo = CreateRepo(100, new HourCostEntity
			{
				Id = 100,
				IsDeleted = false,
				Cost = 250,
				Start = 15,
				End = 20,
				DayType = DiscountDayTypeEnum.Weekend | DiscountDayTypeEnum.Workday,
				IsGeneral = true
			});
			var service = new HourCostManagerService(repo.Object);

			HourCostDto result = service.SaveHourCost(new HourCostUpdateDto
			{
				Id = 100,
				Cost = 100,
				Start = 10,
				End = 23,
				DayType = DiscountDayTypeEnum.Workday
			});

			repo.Verify(x => x.Save(It.IsAny<HourCostEntity>()));
			Assert.AreEqual(100, result.Id);
			Assert.AreEqual(100, result.Cost);
			Assert.AreEqual(DiscountDayTypeEnum.Weekend | DiscountDayTypeEnum.Workday, result.DayType);
			Assert.AreEqual(10, result.Start);
			Assert.AreEqual(23, result.End);
		}

		[TestMethod]
		public void SaveHourCost_Update_EntityIsCommon()
		{
			var repo = CreateRepo(100, new HourCostEntity
			{
				Id = 100,
				IsDeleted = false,
				Cost = 250,
				Start = 15,
				End = 20,
				DayType = DiscountDayTypeEnum.Weekend | DiscountDayTypeEnum.Workday,
				IsGeneral = false
			});
			var service = new HourCostManagerService(repo.Object);

			HourCostDto result = service.SaveHourCost(new HourCostUpdateDto
			{
				Id = 100,
				Cost = 100,
				Start = 10,
				End = 23,
				DayType = DiscountDayTypeEnum.Workday
			});

			repo.Verify(x => x.Save(It.IsAny<HourCostEntity>()));
			Assert.AreEqual(100, result.Id);
			Assert.AreEqual(100, result.Cost);
			Assert.AreEqual(DiscountDayTypeEnum.Workday, result.DayType);
			Assert.AreEqual(10, result.Start);
			Assert.AreEqual(23, result.End);
		}

		private Mock<IRepository<HourCostEntity>> CreateRepo(int id, HourCostEntity entity)
		{
			var repo = new Mock<IRepository<HourCostEntity>>();
			repo.Setup(x => x.GetById(id)).Returns(entity);
			repo.Setup(x => x.Save(It.IsAny<HourCostEntity>()));
			return repo;
		}
	}
}
