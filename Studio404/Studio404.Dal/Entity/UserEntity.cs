﻿using Microsoft.AspNetCore.Identity;

namespace Studio404.Dal.Entity
{
    public class UserEntity : IdentityUser
    {
		public string DisplayName { get; set; }
	}
}