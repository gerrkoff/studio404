using System.Collections.Generic;
using System.Threading.Tasks;
using Studio404.Dto.UserManager;
using Studio404.Services.Interface;
using System;

namespace Studio404.Services.Implementation
{
	public class HourCostManagerService : IHourCostManagerService
	{
		public Task DeleteHourCostAsync(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<HourCostDto>> GetHourCostsAsync()
		{
			throw new NotImplementedException();
		}

		public Task<HourCostDto> SaveHourCostAsync(HourCostDto hourCostDto)
		{
			throw new NotImplementedException();
		}
	}
}