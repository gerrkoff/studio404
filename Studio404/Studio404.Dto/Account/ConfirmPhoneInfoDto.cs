using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.Account
{
    public class ConfirmPhoneInfoDto
    {
        [Required]
        [RegularExpression("9[0-9]{9}")]
        public string Phone { get; set; }

        public string Code { get; set; }
    }
}