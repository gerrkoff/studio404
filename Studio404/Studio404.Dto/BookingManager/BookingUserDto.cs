using Studio404.Common.Enums;

namespace Studio404.Dto.BookingManager
{
    public class BookingUserDto : BookingSpecialDto
    {
        public BookingStatusEnum Status { get; set; }
        public double Cost { get; set; }
        public string UserPhone { get; set; }
        public string UserDisplayName { get; set; }
        public string UserId { get; set; }
    }
}