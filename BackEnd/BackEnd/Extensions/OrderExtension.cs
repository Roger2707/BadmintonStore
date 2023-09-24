using BackEnd.DTOs.Order;
using BackEnd.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Extensions
{
    public static class OrderExtension
    {
        public static IQueryable<OrderDTO> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query
                .Select(order => new OrderDTO
                {
                    Id = order.Id,
                    BuyerId = order.BuyerId,
                    OrderDate = order.OrderDate,
                    ShippingAddress = order.ShippingAddress,
                    DeliveryFee = order.DeliveryFee,
                    Subtotal = order.SubTotal,
                    OrderStatus = order.OrderStatus.ToString(),
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems.Select(item => new OrderItemDTO
                    {
                        ProductId = item.ProductOrderItem.ProductId,
                        Name = item.ProductOrderItem.Name,
                        PictureUrl = item.ProductOrderItem.PictureUrl,
                        Price = item.Price,
                        Quantity = item.Quantity
                    })
                    .ToList()
                }).AsNoTracking();
        }
    }
}
