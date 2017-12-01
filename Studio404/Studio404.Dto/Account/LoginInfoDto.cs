using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.Account
{
    public class LoginInfoDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}