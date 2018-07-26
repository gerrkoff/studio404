using System;
using Studio404.Services.Interface;
using System.Globalization;

namespace Studio404.Services.Implementation
{
    public class DateService : IDateService
    {
        private readonly CultureInfo _currentCulture = new CultureInfo("ru-RU");

        public DateTime Now => DateTime.Now;

        public DateTime NowUtc => DateTime.UtcNow;

        public string ToShortDate(DateTime date)
        {
            return date.ToString("dd MMMM yyyy", _currentCulture);
        }

        public string ToShortTime(DateTime date)
        {
            return date.ToString("HH:mm", _currentCulture);
        }

        public string ToShortDateTime(DateTime date)
        {
            return date.ToString("dd MMMM yyyy HH:mm", _currentCulture);
        }

        public DateTime CreateUnspecifiedDateTime(DateTime date, int hours = 0, int minutes = 0, int seconds = 0)
        {
            return DateTime.SpecifyKind(date.Date.AddHours(hours).AddMinutes(minutes).AddSeconds(seconds),
                DateTimeKind.Unspecified);
        }
    }
}