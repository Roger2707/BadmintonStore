using BackEnd.DTOs.Basket;
using BackEnd.Entities;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Extensions
{
    public static class BasketExtension
    {
        public static BasketDTO MapBasketToDTO(this Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.BasketItems.Select(x => new BasketItemDTO
                {
                    ProductId = x.ProductId,
                    Name = x.Product.Name,
                    Description = x.Product.Description,
                    Price = x.Product.Price,
                    Quantity = x.Quantity,
                    Created = x.Product.Created,
                    PictureUrl = x.Product.PictureUrl,
                    Status = x.Product.Status,
                    CategoryId = x.Product.CategoryId,
                    Category = x.Product.Category,
                    BrandId = x.Product.BrandId,
                    Brand = x.Product.Brand,
                }).ToList(),
            };
        }

       public static IQueryable<Basket> RetrieveBasketOrder(this IQueryable<Basket> query, string buyerId)
        {
            return query.Include(b => b.BasketItems).ThenInclude(b => b.Product).Where(b => b.BuyerId == buyerId);
        }
    }
}
