using System;
using System.Linq;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class CheckService : ICheckService
    {
        private readonly IRepository<BookingEntity> _bookingRepository;
        
        public CheckService(IRepository<BookingEntity> bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }
        
        public bool Check(int code)
        {
            var now = DateTime.Now;
            return _bookingRepository.GetAll()
                .Any(x => x.Code == code &&
                          x.Date == now.Date &&
                          x.From <= now.Hour &&
                          x.To >= now.Hour);
        }
    }
}