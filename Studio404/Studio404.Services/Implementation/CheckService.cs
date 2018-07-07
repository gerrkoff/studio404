using System.Linq;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Services.Interface;
using Studio404.Common.Enums;

namespace Studio404.Services.Implementation
{
	public class CheckService : ICheckService
	{
		private readonly IRepository<BookingEntity> _bookingRepository;
		private readonly IDateService _dateService;

		public CheckService(IRepository<BookingEntity> bookingRepository, IDateService dateService)
		{
			_bookingRepository = bookingRepository;
			_dateService = dateService;
		}

		public bool Check(int shiftMinutes, string code)
		{
			var now = _dateService.NowUtc.AddMinutes(shiftMinutes);
			return _bookingRepository.GetAll()
				.Any(x =>
						(x.Status == BookingStatusEnum.Special || x.Status == BookingStatusEnum.Paid) &&
						x.Code == code &&
						x.From <= now &&
						x.To >= now);
		}
	}
}