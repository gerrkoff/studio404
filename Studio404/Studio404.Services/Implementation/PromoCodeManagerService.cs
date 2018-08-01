using System.Collections.Generic;
using Studio404.Services.Interface;
using Studio404.Dto.PromoCodeManager;
using Studio404.Dal.Repository;
using Studio404.Dal.Entity;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using Studio404.Common.Exceptions;

namespace Studio404.Services.Implementation
{
	public class PromoCodeManagerService : IPromoCodeManagerService
	{
		private readonly IRepository<PromoCodeEntity> _promoCodeRepository;

		public PromoCodeManagerService(IRepository<PromoCodeEntity> promoCodeRepository)
		{
			_promoCodeRepository = promoCodeRepository;
		}

		public IEnumerable<PromoCodeDto> GetPromoCodes()
		{
			return _promoCodeRepository.GetAll().ProjectTo<PromoCodeDto>();
		}

		public PromoCodeDto SavePromoCode(PromoCodeSaveDto promoCodeDto)
		{
			PromoCodeEntity entity = promoCodeDto.Id <= 0
				? InsertEntity(promoCodeDto)
				: UpdateEntity(promoCodeDto);

			_promoCodeRepository.Save(entity);

			return Mapper.Map<PromoCodeDto>(entity);
		}

		private PromoCodeEntity UpdateEntity(PromoCodeSaveDto promoCodeDto)
		{
			PromoCodeEntity entity = _promoCodeRepository.GetById(promoCodeDto.Id.Value);

			ValidatePromoCode(entity);

			entity.From = promoCodeDto.From.Value;
			entity.To = promoCodeDto.To.Value;
			entity.Discount = promoCodeDto.Discount.Value;
			entity.Code = promoCodeDto.Code.ToLowerInvariant();
			entity.Description = promoCodeDto.Description;

			return entity;
		}

		private PromoCodeEntity InsertEntity(PromoCodeSaveDto promoCodeDto)
		{
			PromoCodeEntity entity = Mapper.Map<PromoCodeEntity>(promoCodeDto);
			entity.Id = 0;
			return entity;
		}

		public void DeletePromoCode(int id)
		{
			PromoCodeEntity entity = _promoCodeRepository.GetById(id);

			ValidatePromoCode(entity);

			_promoCodeRepository.Delete(entity);
		}

		private void ValidatePromoCode(PromoCodeEntity entity)
		{
			if (entity == null)
				throw new ServiceException("Promo Code does not exist");

			if (entity.IsDeleted)
				throw new ServiceException("Promo Code has been already deleted");
		}
	}
}