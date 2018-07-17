using System.Collections.Generic;
using Studio404.Services.Interface;
using Studio404.Dto.PromoCodeManager;

namespace Studio404.Services.Implementation
{
	public class PromoCodeManagerService : IPromoCodeManagerService
	{
		public IEnumerable<PromoCodeDto> GetPromoCodes()
		{
			return new[] {
				new PromoCodeDto {},
				new PromoCodeDto {}
			};
		}

		public PromoCodeDto SavePromoCode(PromoCodeSaveDto promoCodeDto)
		{
			return new PromoCodeDto();
		}

		public void DeletePromoCode(int id)
		{
			
		}
	}
}