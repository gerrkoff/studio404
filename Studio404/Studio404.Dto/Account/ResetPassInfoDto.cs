using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.Account
{
    public class ResetPassInfoDto
	{
		[Required]
		public string UserId { get; set; }

		[Required]
        public string Token { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}