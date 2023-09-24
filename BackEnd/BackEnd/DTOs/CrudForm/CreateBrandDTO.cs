using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs
{
    public class CreateBrandDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
    }
}
