using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.Account
{
    public class ChangePassInfoDto
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}