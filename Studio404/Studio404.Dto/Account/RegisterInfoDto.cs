using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.Account
{
    public class RegisterInfoDto
    {
        [Required]
        [MaxLength(30)]
        [RegularExpression("[a-zA-Z0-9_]+")]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}