using BackEnd.Data;
using BackEnd.DTOs.Order;
using BackEnd.Entities;
using BackEnd.Entities.OrderAggregate;
using BackEnd.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [Authorize]
    public class OrderController : BaseAPIController
    {
        private readonly AppDBContext _db;
        public OrderController(AppDBContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            var orders = await _db.Orders
                .ProjectOrderToOrderDto()
                .Where(x => x.BuyerId == User.Identity.Name)
                .ToListAsync();

            return orders;
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            return await _db.Orders
                .ProjectOrderToOrderDto()
                .FirstOrDefaultAsync(x => x.BuyerId == User.Identity.Name && x.Id == id);
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrder(CreateOrder createOrder)
        {
            var basket = await _db.Baskets.RetrieveBasketOrder(buyerId: User.Identity.Name).FirstOrDefaultAsync();
            if (basket == null) return BadRequest(new ProblemDetails { Title = "Could not locate basket" });
            var listOrderItems = new List<OrderItem>();

            foreach(var item in basket.BasketItems)
            {
                var product = await _db.Products.FindAsync(item.ProductId);
                var orderItem = new OrderItem
                {
                    ProductOrderItem = new ProductOrderItem { Name = product.Name, ProductId = product.Id, PictureUrl = product.PictureUrl },
                    Price = product.Price,
                    Quantity = item.Quantity,
                };
                listOrderItems.Add(orderItem);
                product.QuantityInStock -= item.Quantity;
            }

            var subTotal = listOrderItems.Sum(l => l.Price * l.Quantity);
            var deliveryFee = subTotal > 1000000 ? 0 : 100000;

            var order = new Order
            {
                OrderItems = listOrderItems,
                BuyerId = User.Identity.Name,
                ShippingAddress = createOrder.ShippingAddress,
                SubTotal = subTotal,
                DeliveryFee = deliveryFee,
            };

            _db.Orders.Add(order);
            _db.Baskets.Remove(basket);

            if(createOrder.IsSaveAddress)
            {
                var user = await _db.Users.Include(u => u.UserAddress).FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);

                var userAddress = new UserAddress
                {
                    FullName = createOrder.ShippingAddress.FullName,
                    Address1 = createOrder.ShippingAddress.Address1,
                    Address2 = createOrder.ShippingAddress.Address2,
                    City = createOrder.ShippingAddress.City,
                    State = createOrder.ShippingAddress.State,
                    Zip = createOrder.ShippingAddress.Zip,
                    Country = createOrder.ShippingAddress.Country,
                };

                user.UserAddress = userAddress;
                _db.Update(user);
            }

            var result = await _db.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest("Problem Creating Order !");

        }
    }
}
