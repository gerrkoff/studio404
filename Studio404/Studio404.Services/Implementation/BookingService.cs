using System;
using System.Collections.Generic;
using Studio404.Dto.Booking;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class BookingService : IBookingService
    {
        public IEnumerable<DayWorkloadDto> GetWeekWorkload(DateTime weekStartDate)
        {
            var list = new List<DayWorkloadDto>
            {
                new DayWorkloadDto
                {
                    Date = weekStartDate,
                    FreeHours = new[] {10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22}
                },
                new DayWorkloadDto
                {
                    Date = weekStartDate.AddDays(1),
                    FreeHours = new[] {10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22}
                },
                new DayWorkloadDto
                {
                    Date = weekStartDate.AddDays(2),
                    FreeHours = new[] {10, 13, 17, 20, 21, 22}
                },
                new DayWorkloadDto
                {
                    Date = weekStartDate.AddDays(3),
                    FreeHours = new[] {11, 12, 15, 16, 17, 19, 21, 22}
                },
                new DayWorkloadDto
                {
                    Date = weekStartDate.AddDays(4),
                    FreeHours = new[] {10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22}
                },
                new DayWorkloadDto
                {
                    Date = weekStartDate.AddDays(5),
                    FreeHours = new[] {10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22}
                },
                new DayWorkloadDto
                {
                    Date = weekStartDate.AddDays(6),
                    FreeHours = new[] {10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22}
                }
            };

            return list;
        }

        public IEnumerable<DayHourDto> GetDayWorkload(DateTime date)
        {
            var list = new List<DayHourDto>
            {
                new DayHourDto {Hour = 10, Available = true},
                new DayHourDto {Hour = 11, Available = true},
                new DayHourDto {Hour = 12, Available = true},
                new DayHourDto {Hour = 13, Available = true},
                new DayHourDto {Hour = 14},
                new DayHourDto {Hour = 15},
                new DayHourDto {Hour = 16, Available = true},
                new DayHourDto {Hour = 17, Available = true},
                new DayHourDto {Hour = 18, Available = true},
                new DayHourDto {Hour = 19},
                new DayHourDto {Hour = 20},
                new DayHourDto {Hour = 21, Available = true},
                new DayHourDto {Hour = 22, Available = true}
            };
            return list;
        }

        public void MakeBooking(MakeBookingInfoDto makeBookingInfo)
        {
            
        }
    }
}