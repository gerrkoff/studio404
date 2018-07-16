using System.Threading.Tasks;
using Studio404.Dto.UserManager;
using System.Collections.Generic;

namespace Studio404.Services.Interface
{
	public interface IHourCostManagerService
	{
		Task<IEnumerable<HourCostDto>> GetHourCostsAsync();
		Task<HourCostDto> SaveHourCostAsync(HourCostDto hourCostDto);
		Task DeleteHourCostAsync(int id);
	}
}