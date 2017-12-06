using System;
using System.ComponentModel.DataAnnotations;
using Studio404.Common.Enums;
using Studio404.Dal.Entity.Base;

namespace Studio404.Dal.Entity
{
    public class BookingEntity : BaseEntity
    {
        public DateTime Date { get; set; }
        public int From { get; set; }
        public int To { get; set; }
        
        public BookingStatusEnum Status { get; set; }

        public Guid Guid { get; set; }
        public string Code { get; set; }
        
        [Required]
        public string UserId { get; set; }
        public int StudioId { get; set; }
        
        public UserEntity User { get; set; }
    }
}