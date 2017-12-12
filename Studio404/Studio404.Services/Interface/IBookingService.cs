using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Studio404.Dal.Entity;
using Studio404.Dto.Booking;
using Studio404.Dto.Pay;

namespace Studio404.Services.Interface
{
    public interface IBookingService
    {
        IEnumerable<DayWorkloadDto> GetWeekWorkload(DateTime weekStartDate);
        IEnumerable<DayHourDto> GetDayWorkload(DateTime date);
        void MakeBooking(MakeBookingInfoDto makeBookingInfo, UserEntity user);
        void CancelBooking(int id, UserEntity user);
        Task<bool> ResendBookingCode(int id, UserEntity user);
        Task<PrepareBookingPaymentDto> PrepareBookingPayment(int id, UserEntity user);
    }
}