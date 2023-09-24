using BackEnd.Data;
using BackEnd.DTOs.Basket;
using BackEnd.Entities;
using BackEnd.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    public class BasketController : BaseAPIController
    {
        private readonly AppDBContext _db;
        public BasketController(AppDBContext db)
        {
            _db = db;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) return NotFound();
            return basket.MapBasketToDTO();
        }

        [HttpPost]
        public async Task<ActionResult<BasketDTO>> AddToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) basket = CreateBasket();

            var product = await _db.Products.FindAsync(productId);
            if(product == null) return BadRequest(new ProblemDetails { Title = "Product not found"});

            basket.AddToBasket(product, quantity);

            var result = await _db.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDTO());
            return BadRequest(new ProblemDetails { Title = "Add To Basket Failed !" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveFromBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) return NotFound();

            basket.RemoveFromBasket(productId, quantity);
            var result = await _db.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Remove From Basket Failed !" });
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if(String.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _db.Baskets.Include(b => b.BasketItems)
                                    .ThenInclude(i => i.Product)
                                    .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

        private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;

            if(String.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            var basket = new Basket { BuyerId = buyerId };
            _db.Baskets.Add(basket);
            return basket;
        }
    }
}
