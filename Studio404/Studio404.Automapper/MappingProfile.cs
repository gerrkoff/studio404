using AutoMapper;
using Studio404.Dal.Entity;
using Studio404.Dto.Account;
using Studio404.Dto.Booking;
using Studio404.Dto.BookingManager;
using Studio404.Dto.CostInfo;
using Studio404.Dto.PromoCodeManager;
using Studio404.Dto.Schedule;
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

	        CreateMap<BookingEntity, BookingUserDto>()
		        .ForMember(x => x.UserId, e => e.MapFrom(x => x.UserId))
		        .ForMember(x => x.UserPhone, e => e.MapFrom(x => x.User.PhoneNumber))
		        .ForMember(x => x.UserDisplayName, e => e.MapFrom(x => x.User.DisplayName));
	        
			CreateMap<UserEntity, UserDto>();
			CreateMap<HourCostEntity, HourCostDto>();
			CreateMap<HourCostUpdateDto, HourCostEntity>();
			CreateMap<BookingEntity, BookingSpecialDto>();
			CreateMap<BookingSpecialSaveDto, BookingEntity>();
			CreateMap<PromoCodeEntity, PromoCodeDto>();
			CreateMap<PromoCodeSaveDto, PromoCodeEntity>()
		        .ForMember(x => x.Code, e => e.MapFrom(x => x.Code.ToLowerInvariant()));

	        CreateMap<HourCostEntity, StudioSchedule>();
	        CreateMap<HourCostEntity, StudioSchedule.SpecialCost>();

	        CreateMap<PromoCodeEntity, PromoCodeInfoDto>()
		        .ForMember(x => x.CostModifier, e => e.MapFrom(x => (double) (100 - x.Discount) / 100))
		        .ForMember(x => x.Info, e => e.MapFrom(x => $"Скидка {x.Discount}%"));
        }
    }
}