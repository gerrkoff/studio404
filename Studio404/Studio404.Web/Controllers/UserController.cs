using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dal.Entity;
using Studio404.Dto.Booking;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UserController : BaseUserController
    {
        private readonly IUserService _userService;
        
        public UserController(UserManager<UserEntity> userManager, IUserService userService) : base(userManager)
        {
            _userService = userService;
        }

        [HttpGet]
        public IEnumerable<BookingSimpleDto> Bookings()
        {
            return _userService.GetUserBookings(GetUser());
        }
    }
}