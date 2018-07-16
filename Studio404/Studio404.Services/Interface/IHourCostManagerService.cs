﻿using System.Threading.Tasks;
using Studio404.Dto.UserManager;
using System.Collections.Generic;

namespace Studio404.Services.Interface
{
	public interface IHourCostManagerService
	{
		IEnumerable<HourCostDto> GetHourCosts();
		Task<HourCostDto> SaveHourCostAsync(HourCostDto hourCostDto);
		void DeleteHourCost(int id);
	}
}