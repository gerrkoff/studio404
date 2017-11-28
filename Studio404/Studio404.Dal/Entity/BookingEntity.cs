﻿using System;
using Studio404.Dal.Entity.Base;

namespace Studio404.Dal.Entity
{
    public class BookingEntity : BaseEntity
    {
        public DateTime Date { get; set; }
        public int From { get; set; }
        public int To { get; set; }
        public int UserId { get; set; }
        public int StudioId { get; set; }
    }
}