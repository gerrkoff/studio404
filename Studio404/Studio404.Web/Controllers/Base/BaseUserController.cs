﻿using System.Security.Claims;
using Studio404.Dto.Account;

namespace Studio404.Web.Controllers.Base
{
    public class BaseUserController : BaseController
    {
        protected CurrentUser GetUser()
        {
            var identity = (ClaimsIdentity) User.Identity;
            var user = new CurrentUser
            {
                Username = identity.FindFirst(ClaimsIdentity.DefaultNameClaimType).Value,
                UserId = identity.FindFirst(ClaimTypes.Sid).Value,
                Phone = identity.FindFirst(ClaimTypes.MobilePhone)?.Value
            };
            return user;
        }
    }
}