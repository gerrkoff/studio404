using AutoMapper;
using Studio404.Common.Enums;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;
using Studio404.Dto.Booking;
using Studio404.Dto.UserManager;

namespace Studio404.Automapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
			CreateMap<BookingEntity, BookingSimpleDto>()
				.ForMember(x => x.Date, e => e.MapFrom(x => x.From.Date))
				.ForMember(x => x.From, e => e.MapFrom(x => x.From.Hour))
				.ForMember(x => x.To, e => e.MapFrom(x => x.To.Hour - 1));
            CreateMap<CurrentUser, CurrentUserDto>()
				.ForMember(x => x.Username, e => e.MapFrom(x => x.DisplayName))
				.ForMember(x => x.UserLoggedIn, e => e.MapFrom(x => !string.IsNullOrEmpty(x.Username)))
                .ForMember(x => x.Phone, e => e.MapFrom(x => "*" + x.Phone.Substring(x.Phone.Length - 4, 4)));
			CreateMap<UserEntity, UserDto>();
        }
    }
}