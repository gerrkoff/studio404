using AutoMapper;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dto.Booking;

namespace Studio404.Automapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BookingEntity, BookingSimpleDto>();
        }
    }
}