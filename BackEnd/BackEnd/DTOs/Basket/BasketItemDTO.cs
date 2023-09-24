using BackEnd.Entities;

namespace BackEnd.DTOs.Basket
{
    public class BasketItemDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public long Quantity { get; set; }
        public DateTime Created { get; set; }
        public string? PictureUrl { get; set; }
        public bool Status { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
    }
}
