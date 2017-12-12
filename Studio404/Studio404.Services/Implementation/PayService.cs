using System;
using System.Collections.Generic;
using System.Linq;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Services.Interface;
using Microsoft.Extensions.Logging;
using Studio404.Dto.Pay;

namespace Studio404.Services.Implementation
{
    public class PayService : IPayService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;
        private readonly INotificationService _notificationService;
        private readonly ILogger<PayService> _logger;

        public PayService(IRepository<BookingEntity> bookingRepository, INotificationService notificationService, ILogger<PayService> logger)
        {
            _bookingRepository = bookingRepository;
            _notificationService = notificationService;
            _logger = logger;
        }

        public void ConfirmBooking(Guid guid)
        {
            BookingEntity booking = _bookingRepository.GetAll()
                .Single(x => x.Guid == guid);

            if (booking.Status == BookingStatusEnum.Paid)
                _logger.LogWarning($"Booking was already paid. GUID: {guid}");

            booking.Code = GenerateBookingCode();
            booking.Status = BookingStatusEnum.Paid;
            _bookingRepository.Save(booking);

            _notificationService.SendBookingCodeAsync(booking);
        }

        public PrepareBookingPaymentDto PrepareBookingPayment(int id)
        {
            var data = new PrepareBookingPaymentDto
            {
                Url = "https://money.yandex.ru/quickpay/confirm.xml",
                Form = new List<PrepareBookingPaymentDto.FormInput>()
            };
            data.AddFormInput("quickpay-form", "small");
            data.AddFormInput("receiver", "410015855170459");
            data.AddFormInput("targets", "Rehearsal payment");
            data.AddFormInput("paymentType", "AC");
            data.AddFormInput("sum", "50");
            data.AddFormInput("label", "11111");
            data.AddFormInput("formcomment", "Qwerty");
            data.AddFormInput("short-dest", "Qwerty");

            return data;
        }

        private string GenerateBookingCode()
        {
            var random = new Random();
            int numericCode = random.Next(10000);
            
            return numericCode.ToString().PadLeft(4, '0');
        }
    }
}