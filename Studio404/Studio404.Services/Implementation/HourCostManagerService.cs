using System.Collections.Generic;
using System.Threading.Tasks;
using Studio404.Dto.UserManager;
using Studio404.Services.Interface;
using System;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using AutoMapper.QueryableExtensions;

namespace Studio404.Services.Implementation
{
	public class HourCostManagerService : IHourCostManagerService
	{
		private readonly IRepositoryNonDeletable<HourCostEntity> _hourCostRepository;

		public HourCostManagerService(IRepositoryNonDeletable<HourCostEntity> hourCostRepository)
		{
			_hourCostRepository = hourCostRepository;
		}

		public Task DeleteHourCostAsync(int id)
		{
			throw new NotImplementedException();
		}

		public IEnumerable<HourCostDto> GetHourCosts()
		{
			return _hourCostRepository.GetAll().ProjectTo<HourCostDto>();
		}

		public Task<HourCostDto> SaveHourCostAsync(HourCostDto hourCostDto)
		{
			throw new NotImplementedException();
		}
	}
}