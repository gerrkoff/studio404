using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dal.Entity;
using Studio404.Dto.Booking;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UserController : BaseUserController
    {
        public UserController(UserManager<UserEntity> userManager) : base(userManager)
        {
        }

        [HttpGet]
        public IEnumerable<BookingSimpleDto> Bookings()
        {
            return new List<BookingSimpleDto>()
            {
                new BookingSimpleDto
                {
                    Date = DateTime.Today,
                    From = 10,
                    To = 12,
                    Id = 1,
                    Status = BookingStatus.Canceled
                },
                new BookingSimpleDto {Date = DateTime.Today, From = 13, To = 15, Id = 2, Status = BookingStatus.Unpaid},
                new BookingSimpleDto {Date = DateTime.Today, From = 16, To = 19, Id = 3, Status = BookingStatus.Paid},
                new BookingSimpleDto {Date = DateTime.Today, From = 20, To = 22, Id = 4, Status = BookingStatus.Paid}
            };
        }
    }
}