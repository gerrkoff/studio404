using AutoMapper;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;
using Studio404.Dto.Booking;

namespace Studio404.Automapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BookingEntity, BookingSimpleDto>();
            CreateMap<CurrentUser, CurrentUserDto>()
				.ForMember(x => x.Username, e => e.MapFrom(x => x.DisplayName))
				.ForMember(x => x.UserLoggedIn, e => e.MapFrom(x => !string.IsNullOrEmpty(x.Username)))
                .ForMember(x => x.Phone, e => e.MapFrom(x => "*" + x.Phone.Substring(x.Phone.Length - 4, 4)));
        }
    }
}