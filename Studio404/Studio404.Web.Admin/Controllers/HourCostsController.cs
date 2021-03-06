﻿using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using Studio404.Dto.UserManager;
using System.Collections.Generic;
using Studio404.Common.Exceptions;
using Studio404.Web.Common.Controllers;

namespace Studio404.Web.Admin.Controllers
{
	[Route("api/[controller]")]
    public class HourCostsController : BaseController
    {
        private readonly IHourCostManagerService _hourCostManagerService;

        public HourCostsController(IHourCostManagerService hourCostManagerService)
        {
			_hourCostManagerService = hourCostManagerService;
        }

        [HttpGet]
        public IEnumerable<HourCostDto> Get()
        {
			return _hourCostManagerService.GetHourCosts();
        }

		[HttpPost]
		public HourCostDto Post([FromBody] HourCostUpdateDto hourCostDto)
		{
			Validate();

			if (hourCostDto.Start > hourCostDto.End)
				throw new ModelValidationException("Start should be less or equal to End");

			return _hourCostManagerService.SaveHourCost(hourCostDto);
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			_hourCostManagerService.DeleteHourCost(id);
		}
	}
}
