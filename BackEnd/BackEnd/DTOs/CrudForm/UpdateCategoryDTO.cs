using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs
{
    public class UpdateCategoryDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
