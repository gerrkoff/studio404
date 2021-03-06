﻿using System;
using Studio404.Common.Enums;
using Studio404.Dal.Entity.Base;

namespace Studio404.Dal.Entity
{
	public class BookingEntity : DeletableEntity
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        
        public BookingStatusEnum Status { get; set; }
        public double Cost { get; set; }

        public Guid Guid { get; set; }
        public string Code { get; set; }
        
        public string UserId { get; set; }
        public int StudioId { get; set; }
        
        public int? PromoCodeId { get; set; }
        
        public UserEntity User { get; set; }
        public PromoCodeEntity PromoCode { get; set; }
    }
}