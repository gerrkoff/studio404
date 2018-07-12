using System;
using System.Collections.Generic;
using System.Text;

namespace Studio404.Dto.UserManager
{
    public class UserDto
    {
		public string Id { get; set; }
		public string PhoneNumber { get; set; }
		public string UserName { get; set; }
		public string DisplayName { get; set; }
		public bool IsAdmin { get; set; }
	}
}
