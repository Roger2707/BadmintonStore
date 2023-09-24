using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs
{
    public class UpdateBrandDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
    }
}
