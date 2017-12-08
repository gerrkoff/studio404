using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.Account
{
    public class PhoneInfoDto
    {
        [Required]
        [RegularExpression("[0-9]{10}")]
        public string Phone { get; set; }
    }
}