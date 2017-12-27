using System;
using Studio404.Services.Interface;
using System.Globalization;

namespace Studio404.Services.Implementation
{
    public class DateService : IDateService
    {
        private readonly CultureInfo currentCulture = new CultureInfo("ru-RU");

        public DateTime Now => DateTime.Now;

        public DateTime NowUtc => DateTime.UtcNow;

        public string ToShortDate(DateTime date)
        {
            return date.ToString("dd MMMM yyyy", currentCulture);
        }
    }
}