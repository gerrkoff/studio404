using System;

namespace Studio404.Services.Interface
{
    public interface IDateService
    {
        DateTime Now { get; }
        DateTime NowUtc { get; }
    }
}