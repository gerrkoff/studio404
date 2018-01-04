using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Services.Interface;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Studio404.Common.Settings;
using Studio404.Dto.Pay;

namespace Studio404.Services.Implementation
{
    public class PayService : IPayService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;
        private readonly INotificationService _notificationService;
        private readonly ILogger<PayService> _logger;
        private readonly PayServiceSettings _payServiceSettings;

        public PayService(IRepository<BookingEntity> bookingRepository, INotificationService notificationService,
            ILogger<PayService> logger, IOptions<PayServiceSettings> payServiceSettings)
        {
            _bookingRepository = bookingRepository;
            _notificationService = notificationService;
            _logger = logger;
            _payServiceSettings = payServiceSettings.Value;
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

        public PrepareBookingPaymentDto PrepareBookingPaymnent(BookingEntity booking)
        {
            string paymentInfo =
                $"Rehearsal on {booking.Date.ToShortDateString()}, {ToTime(booking.From)} - {ToTime(booking.To + 1)}";
            
            var data = new PrepareBookingPaymentDto
            {
                Url = "https://money.yandex.ru/quickpay/confirm.xml",
                Form = new List<PrepareBookingPaymentDto.FormInput>()
            };
            data.AddFormInput("quickpay-form", "small");
            data.AddFormInput("targets", "Rehearsal payment");
            data.AddFormInput("paymentType", "AC");
            data.AddFormInput("formcomment", "404 studio");
            data.AddFormInput("short-dest", paymentInfo);
            data.AddFormInput("receiver", _payServiceSettings.YandexId);
            data.AddFormInput("label", booking.Guid.ToString());
            data.AddFormInput("sum", booking.Cost.ToString(CultureInfo.InvariantCulture));
			//data.AddFormInput("successURL", _payServiceSettings.SuccessUrl);

			return data;
        }
        
        private string ToTime(int hour)
        {
            return (hour < 10 ? "0" : "") + $"{hour}:00";
        }

        private string GenerateBookingCode()
        {
            var random = new Random();
            int numericCode = random.Next(10000);
            
            return numericCode.ToString().PadLeft(4, '0');
        }
    }
}