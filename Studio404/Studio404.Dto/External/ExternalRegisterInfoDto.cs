using System.ComponentModel.DataAnnotations;

namespace Studio404.Dto.External
{
    public class ExternalRegisterInfoDto
    {
        [Required]
        [MaxLength(30)]
        [RegularExpression("[a-zA-Z0-9_]+")]
        public string Username { get; set; }
    }
}