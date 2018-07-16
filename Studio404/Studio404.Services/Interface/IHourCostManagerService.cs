using Studio404.Dto.UserManager;
using System.Collections.Generic;

namespace Studio404.Services.Interface
{
	public interface IHourCostManagerService
	{
		IEnumerable<HourCostDto> GetHourCosts();
		HourCostDto SaveHourCost(HourCostUpdateDto hourCostDto);
		void DeleteHourCost(int id);
	}
}