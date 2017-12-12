using System;
using Microsoft.AspNetCore.Mvc;

namespace Studio404.Dto.Pay
{
    public class ConfirmBookingDto
    {
        [FromForm(Name = "notification_type")]
        public string NotificationType { get; set; }
        
        [FromForm(Name = "operation_id")]
        public string OperationId { get; set; }
        
        [FromForm(Name = "amount")]
        public double Amount { get; set; }
        
        [FromForm(Name = "currency")]
        public string Currency { get; set; }
        
        [FromForm(Name = "datetime")]
        public DateTime DateTime { get; set; }
        
        [FromForm(Name = "sender")]
        public string Sender { get; set; }
        
        [FromForm(Name = "codepro")]
        public bool CodePro { get; set; }
        
        [FromForm(Name = "label")]
        public string Label { get; set; }
        
        [FromForm(Name = "sha1_hash")]
        public string Hash { get; set; }
    }
}