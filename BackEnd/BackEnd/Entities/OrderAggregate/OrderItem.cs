namespace BackEnd.Entities.OrderAggregate
{
    public class OrderItem
    {
        public int Id { get; set; } 
        public ProductOrderItem ProductOrderItem { get; set; }
        public int Quantity { get; set; }
        public long Price { get; set; }
    }
}
