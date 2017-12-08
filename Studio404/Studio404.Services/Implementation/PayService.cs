﻿using System;
using System.Linq;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class PayService : IPayService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;
        private readonly INotificationService _notificationService;

        public PayService(IRepository<BookingEntity> bookingRepository, INotificationService notificationService)
        {
            _bookingRepository = bookingRepository;
            _notificationService = notificationService;
        }

        public void ConfirmBooking(Guid guid)
        {
            BookingEntity booking = _bookingRepository.GetAll()
                .Single(x => x.Guid == guid);

            if (booking.Status == BookingStatusEnum.Paid)
            {
                // TODO: Log warning if booking already paid                
            }

            booking.Code = GenerateBookingCode();
            booking.Status = BookingStatusEnum.Paid;
            _bookingRepository.Save(booking);

            _notificationService.SendBookingCodeAsync(booking);
        }

        private string GenerateBookingCode()
        {
            var random = new Random();
            int numericCode = random.Next(10000);
            
            return numericCode.ToString().PadLeft(4, '0');
        }
    }
}