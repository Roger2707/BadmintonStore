namespace BackEnd.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public long QuantityInStock { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string? PictureUrl { get; set; }
        public bool Status { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
    }
}
