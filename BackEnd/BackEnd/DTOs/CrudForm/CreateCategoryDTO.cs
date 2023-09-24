using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs
{
    public class CreateCategoryDTO
    {
        [Required]
        public string Name { get; set; }
    }
}
