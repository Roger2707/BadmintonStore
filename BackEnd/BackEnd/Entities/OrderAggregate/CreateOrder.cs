namespace BackEnd.Entities.OrderAggregate
{
    public class CreateOrder
    {
        public ShippingAddress ShippingAddress { get; set; }
        public bool IsSaveAddress { get; set; }
    }
}
