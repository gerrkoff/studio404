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
using Studio404.Common.Exceptions;
using Studio404.Common.Settings;
using Studio404.Dto.Pay;

namespace Studio404.Services.Implementation
{
    public class PayService : IPayService
    {
        private readonly IRepositoryNonDeletable<BookingEntity> _bookingRepository;
        private readonly INotificationService _notificationService;
        private readonly ILogger<PayService> _logger;
        private readonly PayServiceSettings _payServiceSettings;
        private readonly IDateService _dateService;

        public PayService(IRepositoryNonDeletable<BookingEntity> bookingRepository, INotificationService notificationService,
                          ILogger<PayService> logger, IOptions<PayServiceSettings> payServiceSettings, IDateService dateService)
        {
            _bookingRepository = bookingRepository;
            _notificationService = notificationService;
            _logger = logger;
            _payServiceSettings = payServiceSettings.Value;
            _dateService = dateService;
        }

        public void ConfirmBooking(Guid guid, double amount)
        {
            BookingEntity booking = _bookingRepository.GetAll()
                .Single(x => x.Guid == guid);

            if (booking.Status == BookingStatusEnum.Paid)
                _logger.LogWarning($"Booking was already paid. GUID: {guid}");

            if (Math.Abs(booking.Cost - amount) > 1)
            {
                string msg =
                    $"Received amount doesn't equal to expected. Expected={booking.Cost} Received={amount} BookingId={booking.Id}"; 
                _logger.LogError(msg);
                throw new ServiceException(msg);
            }

            booking.Code = GenerateBookingCode();
            booking.Status = BookingStatusEnum.Paid;
            _bookingRepository.Save(booking);

            _notificationService.SendBookingCodeAsync(booking);
        }

        public PrepareBookingPaymentDto PrepareBookingPaymnent(BookingEntity booking)
        {
            string paymentInfo =
                $"Rehearsal from {_dateService.ToShortDateTime(booking.From)} to {_dateService.ToShortDateTime(booking.To)}";
            
            var data = new PrepareBookingPaymentDto
            {
                Url = "https://money.yandex.ru/quickpay/confirm.xml",
                Form = new List<PrepareBookingPaymentDto.FormInput>()
            };
            data.AddFormInput("quickpay-form", "small");
            data.AddFormInput("short-dest", "Rehearsal payment");
            data.AddFormInput("paymentType", "AC");
            data.AddFormInput("formcomment", "404 studio");
            data.AddFormInput("targets", paymentInfo);
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