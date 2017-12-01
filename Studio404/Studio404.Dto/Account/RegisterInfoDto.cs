using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.Account
{
    public class RegisterInfoDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare(nameof(Password), ErrorMessage = "Passwords are not equal")]
        public string PasswordConfirm { get; set; }
    }
}