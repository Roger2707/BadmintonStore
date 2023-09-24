using Microsoft.EntityFrameworkCore;

namespace BackEnd.Entities.OrderAggregate
{
    [Owned]
    public class ProductOrderItem
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }
}
