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
using Studio404.Common.Enums;
using System.Globalization;
using Microsoft.Data.OData;
using Microsoft.Extensions.Logging;
using Studio404.Common.Exceptions;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class PayServiceTest
    {
        [TestMethod]
        public void ConfirmBooking_Positive()
        {
            var guid = Guid.NewGuid();
            var bookEntity = new BookingEntity
            {
                Guid = guid
            };

            var service = CreateService(bookEntity, out Mock<INotificationService> notificationMock,
                out Mock<IRepository<BookingEntity>> repoMock);

            service.ConfirmBooking(guid, 0);

            AssertPaymentConfirmationSuccessFull(bookEntity, notificationMock, repoMock);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void ConfirmBooking_NoBookingWithSuchGuid()
        {
            var guid = Guid.NewGuid();

            var repoMock = new Mock<IRepository<BookingEntity>>();
            repoMock.Setup(x => x.GetAll()).Returns(new List<BookingEntity>().AsQueryable());
            var settings = Mock.Of<IOptions<PayServiceSettings>>();
            var service = new PayService(repoMock.Object, null, null, settings, new DateService());

            service.ConfirmBooking(guid, 0);
        }
        
        [TestMethod]
        public void ConfirmBooking_AmountDiffEqualTo1()
        {
            var guid = Guid.NewGuid();
            var bookEntity = new BookingEntity
            {
                Guid = guid,
                Cost = 100
            };
            
            var service = CreateService(bookEntity, out Mock<INotificationService> notificationMock,
                out Mock<IRepository<BookingEntity>> repoMock);

            service.ConfirmBooking(guid, 101);

            AssertPaymentConfirmationSuccessFull(bookEntity, notificationMock, repoMock);
        }
        
        [TestMethod]
        [ExpectedException(typeof(ServiceException))]
        public void ConfirmBooking_AmountDiffTooBig()
        {
            var guid = Guid.NewGuid();
            var bookEntity = new BookingEntity
            {
                Guid = guid,
                Cost = 100
            };
            var repoMock = new Mock<IRepository<BookingEntity>>();
            repoMock.Setup(x => x.GetAll())
                .Returns(new List<BookingEntity> { new BookingEntity(), bookEntity, new BookingEntity() }.AsQueryable());
            var notificationMock = new Mock<INotificationService>();
            var settings = new Mock<IOptions<PayServiceSettings>>();
            var loggerMock = new Mock<ILogger<PayService>>();
            var service = new PayService(repoMock.Object, notificationMock.Object, loggerMock.Object, settings.Object, new DateService());

            service.ConfirmBooking(guid, 102);
        }

        #region Helpers
        
        private PayService CreateService(BookingEntity entity, out Mock<INotificationService> notificationMock,
            out Mock<IRepository<BookingEntity>> repoMock)
        {
            repoMock = new Mock<IRepository<BookingEntity>>();
            repoMock.Setup(x => x.GetAll())
                .Returns(new List<BookingEntity> { new BookingEntity(), entity, new BookingEntity() }.AsQueryable());
            notificationMock = new Mock<INotificationService>();
            var settings = Mock.Of<IOptions<PayServiceSettings>>();
            var logger = Mock.Of<ILogger<PayService>>();
            return new PayService(repoMock.Object, notificationMock.Object, logger, settings, new DateService());
        }

        private void AssertPaymentConfirmationSuccessFull(BookingEntity entity,
            Mock<INotificationService> notificationMock, Mock<IRepository<BookingEntity>> repoMock)
        {
            Assert.AreEqual(BookingStatusEnum.Paid, entity.Status);
            Assert.IsTrue(!string.IsNullOrWhiteSpace(entity.Code));
            repoMock.Verify(x => x.Save(entity), Times.Once());
            notificationMock.Verify(x => x.SendBookingCodeAsync(entity), Times.Once());
        }
        
        #endregion

        [TestMethod]
        public void PrepareBookingPaymnent()
        {
            var bookingEntity = new BookingEntity
            {
                Guid = Guid.NewGuid(),
                Cost = 500
            };
            var settings = new Mock<IOptions<PayServiceSettings>>();
            settings.Setup(x => x.Value).Returns(new PayServiceSettings
            {
                YandexId = "yandexid"
            });
            var service = new PayService(null, null, null, settings.Object, new DateService());

            var result = service.PrepareBookingPaymnent(bookingEntity);

            Assert.AreEqual(8, result.Form.Count());
            Assert.IsTrue(!string.IsNullOrWhiteSpace(result.Url));
            Assert.AreEqual("yandexid", result.Form.First(x => x.Name == "receiver").Value);
            Assert.AreEqual(bookingEntity.Guid.ToString(), result.Form.First(x => x.Name == "label").Value);
            Assert.AreEqual(bookingEntity.Cost.ToString(CultureInfo.InvariantCulture), result.Form.First(x => x.Name == "sum").Value);
            Assert.AreEqual("small", result.Form.First(x => x.Name == "quickpay-form").Value);
            Assert.IsTrue(!string.IsNullOrWhiteSpace(result.Form.First(x => x.Name == "short-dest").Value));
            Assert.IsTrue(!string.IsNullOrWhiteSpace(result.Form.First(x => x.Name == "paymentType").Value));
            Assert.IsTrue(!string.IsNullOrWhiteSpace(result.Form.First(x => x.Name == "formcomment").Value));
            Assert.IsTrue(!string.IsNullOrWhiteSpace(result.Form.First(x => x.Name == "targets").Value));
        }
    }
}
