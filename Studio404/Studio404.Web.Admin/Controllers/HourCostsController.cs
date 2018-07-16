using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;
using Studio404.Dto.UserManager;
using System.Collections.Generic;

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
		public Task<HourCostDto> Post([FromBody] HourCostDto hourCostDto)
		{
			return _hourCostManagerService.SaveHourCostAsync(hourCostDto);
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			_hourCostManagerService.DeleteHourCost(id);
		}
	}
}
