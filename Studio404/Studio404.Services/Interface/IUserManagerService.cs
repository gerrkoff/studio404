using System.Threading.Tasks;
using Studio404.Common.Enums;
using Studio404.Dto.Account;
using System.Collections;
using Studio404.Dto.UserManager;
using System.Collections.Generic;

namespace Studio404.Services.Interface
{
    public interface IUserManagerService
	{
		IEnumerable<UserDto> GetUsers();
    }
}