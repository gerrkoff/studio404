using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.Account
{
    public class RegisterInfoDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}