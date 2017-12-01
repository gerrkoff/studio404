using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.Account
{
    public class LoginInfoDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}