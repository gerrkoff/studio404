using System;

namespace Studio404.Services.Interface
{
    public interface IDateService
    {
        DateTime Now { get; }
        DateTime NowUtc { get; }
        string ToShortDate(DateTime date);
        string ToShortTime(DateTime date);
        string ToShortDateTime(DateTime date);
        DateTime CreateUnspecifiedDateTime(DateTime date, int hours = 0, int minutes = 0, int seconds = 0);
    }
}