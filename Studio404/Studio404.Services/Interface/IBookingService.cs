using System;
using System.Collections.Generic;
using Studio404.Dal.Entity;
using Studio404.Dto.Booking;

namespace Studio404.Services.Interface
{
    public interface IBookingService
    {
        IEnumerable<DayWorkloadDto> GetWeekWorkload(DateTime weekStartDate);
        IEnumerable<DayHourDto> GetDayWorkload(DateTime date);
        void MakeBooking(MakeBookingInfoDto makeBookingInfo, UserEntity user);
        void RejectBooking(int id, UserEntity user);
    }
}