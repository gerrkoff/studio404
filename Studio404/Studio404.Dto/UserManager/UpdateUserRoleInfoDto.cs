using System;
using System.Collections.Generic;
using System.Text;

namespace Studio404.Dto.UserManager
{
    public class UpdateUserRoleInfoDto
	{
		public string UserId { get; set; }		
		public bool IsAdmin { get; set; }
	}
}
