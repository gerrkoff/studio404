using Studio404.Dto.PromoCodeManager;
using System.Collections.Generic;

namespace Studio404.Services.Interface
{
	public interface IPromoCodeManagerService
	{
		IEnumerable<PromoCodeDto> GetPromoCodes();
		PromoCodeDto SavePromoCode(PromoCodeSaveDto promoCodeDto);
		void DeletePromoCode(int id);
	}
}