using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Studio404.Dto.Account;
using Studio404.Dto.Booking;
using Studio404.Dto.Pay;

namespace Studio404.Services.Interface
{
    public interface IBookingService
    {
        IEnumerable<DayWorkloadDto> GetWeekWorkload(DateTime weekStartDate);
        IEnumerable<DayHourDto> GetDayWorkload(DateTime date);
        void MakeBooking(MakeBookingInfoDto makeBookingInfo, CurrentUser user);
        void CancelBooking(int id, CurrentUser user);
        Task<bool> ResendBookingCode(int id, CurrentUser user);
        PrepareBookingPaymentDto PrepareBookingPayment(int id, CurrentUser user);
    }
}