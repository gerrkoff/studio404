using System;

namespace Studio404.Dto.BookingManager
{
    public class BookingSpecialDto
    {
        public int Id { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string Code { get; set; }
    }
}