using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs
{
    public class CreateProductDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [Range(10000, Double.PositiveInfinity)]
        public long Price { get; set; }
        [Required]
        [Range(0, 200)]
        public long QuantityInStock { get; set; }
        public IFormFile? File { get; set; }
        [Required]
        public bool Status { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public int BrandId { get; set; }
    }
}
