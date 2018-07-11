using System.Linq;
using Microsoft.Extensions.Logging;
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
		private readonly ILogger<CheckService> _logger;

		public CheckService(IRepository<BookingEntity> bookingRepository, IDateService dateService, ILogger<CheckService> logger = null)
		{
			_bookingRepository = bookingRepository;
			_dateService = dateService;
			_logger = logger;
		}

		public bool Check(int shiftMinutes, string code)
		{
			var now = _dateService.NowUtc.AddMinutes(shiftMinutes);
			_logger?.LogInformation($"Now equals to {now}");
			return _bookingRepository.GetAll()
				.Any(x =>
						(x.Status == BookingStatusEnum.Special || x.Status == BookingStatusEnum.Paid) &&
						x.Code == code &&
						x.From <= now &&
						x.To >= now);
		}
	}
}