using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using Studio404.Web.Controllers.Base;
using System.Collections.Generic;
using Studio404.Dto.PromoCodeManager;
using Studio404.Common.Exceptions;

namespace Studio404.Web.Admin.Controllers
{
	[Route("api/[controller]")]
    public class PromoCodesController : BaseController
    {
        private readonly IPromoCodeManagerService _promoCodeManagerService;

        public PromoCodesController(IPromoCodeManagerService promoCodeManagerService)
        {
			_promoCodeManagerService = promoCodeManagerService;
        }

        [HttpGet]
        public IEnumerable<PromoCodeDto> Get()
        {
			return _promoCodeManagerService.GetPromoCodes();
        }
		
		[HttpPost]
		public PromoCodeDto Post([FromBody] PromoCodeSaveDto promoCodeDto)
		{
			Validate();

			if (promoCodeDto.From > promoCodeDto.To)
				throw new ModelValidationException("From should be less than To");

			return _promoCodeManagerService.SavePromoCode(promoCodeDto);
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			_promoCodeManagerService.DeletePromoCode(id);
		}
	}
}
