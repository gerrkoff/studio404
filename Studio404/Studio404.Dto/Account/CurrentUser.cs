using System;

namespace Studio404.Dto.Account
{
    public class CurrentUser
    {
        public string UserId { get; set; }
        public string Username { get; set; }
		public string DisplayName { get; set; }
		public string Phone { get; set; }
        public bool PhoneConfirmed => !string.IsNullOrWhiteSpace(Phone);

        public DateTime? Expires { get; set; }
    }
}