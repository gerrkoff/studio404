using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Services.Implementation;
using Moq;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Common.Enums;
using Studio404.Dto.UserManager;
using Studio404.Common.Exceptions;
using Studio404.Dto.PromoCodeManager;

namespace Studio404.Services.Tests
{
	[TestClass]
    public class PromoCodeManager_SavePromoCode_ServiceTest
	{
        [TestMethod]
        public void SavePromoCode_Insert()
        {
			var repo = CreateRepo(0, null);
            var service = new PromoCodeManagerService(repo.Object);

			PromoCodeDto result = service.SavePromoCode(new PromoCodeSaveDto
			{
				Id = -1,
				Code = "CODE",
				Description = "description",
				Discount = 90,
				From = DateTime.Today,
				To = DateTime.Today
			});

			repo.Verify(x => x.Save(It.IsAny<PromoCodeEntity>()));
			Assert.AreEqual(0, result.Id);
			Assert.AreEqual("code", result.Code);
			Assert.AreEqual("description", result.Description);
			Assert.AreEqual(90, result.Discount);
			Assert.AreEqual(DateTime.Today, result.From);
	        Assert.AreEqual(DateTime.Today, result.To);
        }
		
		[TestMethod]
		public void SavePromoCode_Update()
		{
			var repo = CreateRepo(100, new PromoCodeEntity
			{
				Id = 100
			});
			var service = new PromoCodeManagerService(repo.Object);

			PromoCodeDto result = service.SavePromoCode(new PromoCodeSaveDto
			{
				Id = 100,
				Code = "CODE",
				Description = "description",
				Discount = 90,
				From = DateTime.Today,
				To = DateTime.Today
			});

			repo.Verify(x => x.Save(It.IsAny<PromoCodeEntity>()));
			Assert.AreEqual(100, result.Id);
			Assert.AreEqual("code", result.Code);
			Assert.AreEqual("description", result.Description);
			Assert.AreEqual(90, result.Discount);
			Assert.AreEqual(DateTime.Today, result.From);
			Assert.AreEqual(DateTime.Today, result.To);
		}

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void SavePromoCode_Update_NoEntity()
		{
			var repo = CreateRepo(100, null);
			var service = new PromoCodeManagerService(repo.Object);

			service.SavePromoCode(new PromoCodeSaveDto
			{
				Id = 100
			});
		}

		[TestMethod]
		[ExpectedException(typeof(ServiceException))]
		public void SavePromoCode_Update_EntityAlreadyDeleted()
		{
			var repo = CreateRepo(100, new PromoCodeEntity
			{
				IsDeleted = true
			});
			var service = new PromoCodeManagerService(repo.Object);

			service.SavePromoCode(new PromoCodeSaveDto
			{
				Id = 100
			});
		}

		private Mock<IRepository<PromoCodeEntity>> CreateRepo(int id, PromoCodeEntity entity)
		{
			var repo = new Mock<IRepository<PromoCodeEntity>>();
			repo.Setup(x => x.GetById(id)).Returns(entity);
			repo.Setup(x => x.Save(It.IsAny<PromoCodeEntity>()));
			return repo;
		}
	}
}
