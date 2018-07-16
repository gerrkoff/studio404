using System.Collections.Generic;
using System.Threading.Tasks;
using Studio404.Dto.UserManager;
using Studio404.Services.Interface;
using System;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using Studio404.Common.Exceptions;

namespace Studio404.Services.Implementation
{
	public class HourCostManagerService : IHourCostManagerService
	{
		private readonly IRepository<HourCostEntity> _hourCostRepository;

		public HourCostManagerService(IRepository<HourCostEntity> hourCostRepository)
		{
			_hourCostRepository = hourCostRepository;
		}

		public void DeleteHourCost(int id)
		{
			_hourCostRepository.Delete(id);
		}

		public IEnumerable<HourCostDto> GetHourCosts()
		{
			return _hourCostRepository.GetAll().ProjectTo<HourCostDto>();
		}

		public HourCostDto SaveHourCost(HourCostUpdateDto hourCostDto)
		{
			HourCostEntity entity = hourCostDto.Id <= 0
				? InsertEntity(hourCostDto)
				: UpdateEntity(hourCostDto);

			_hourCostRepository.Save(entity);

			return Mapper.Map<HourCostDto>(entity);
		}

		private HourCostEntity UpdateEntity(HourCostUpdateDto hourCostDto)
		{
			HourCostEntity entity = _hourCostRepository.GetById(hourCostDto.Id.Value);

			if (entity == null)
				throw new ServiceException("Hour Cost does not exist");

			if (entity.IsDeleted)
				throw new ServiceException("Hour Cost has been already deleted");

			entity.Start = hourCostDto.Start.Value;
			entity.End = hourCostDto.End.Value;
			entity.Cost = hourCostDto.Cost.Value;

			if (!entity.IsGeneral)
				entity.DayType = hourCostDto.DayType.Value;

			return entity;
		}

		private HourCostEntity InsertEntity(HourCostUpdateDto hourCostDto)
		{
			HourCostEntity entity = Mapper.Map<HourCostEntity>(hourCostDto);
			entity.Id = 0;
			return entity;
		}
	}
}