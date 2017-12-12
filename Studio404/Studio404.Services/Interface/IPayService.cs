using System;
using Studio404.Dto.Pay;

namespace Studio404.Services.Interface
{
    public interface IPayService
    {
        void ConfirmBooking(Guid guid);
    }
}