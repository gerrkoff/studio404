using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using System.Collections.Generic;
using Studio404.Dto.PromoCodeManager;
using Studio404.Common.Exceptions;
using Studio404.Web.Common.Controllers;
using System;

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

			promoCodeDto.From = DateTime.SpecifyKind(promoCodeDto.From.Value, DateTimeKind.Unspecified);
			promoCodeDto.To = DateTime.SpecifyKind(promoCodeDto.To.Value, DateTimeKind.Unspecified);

			return _promoCodeManagerService.SavePromoCode(promoCodeDto);
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			_promoCodeManagerService.DeletePromoCode(id);
		}
	}
}
