using System;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class DateService : IDateService
    {
        public DateTime Now => DateTime.Now;

        public DateTime NowUtc => DateTime.UtcNow;
    }
}