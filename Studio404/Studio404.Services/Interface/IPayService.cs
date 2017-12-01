using System;

namespace Studio404.Services.Interface
{
    public interface IPayService
    {
        void ConfirmBooking(Guid guid);
    }
}