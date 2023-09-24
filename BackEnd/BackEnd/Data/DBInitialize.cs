using BackEnd.Entities;
using Microsoft.AspNetCore.Identity;

namespace BackEnd.Data
{
    public static class DBInitialize
    {
        public static async Task Initialize(AppDBContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "bob",
                    Email = "bob@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "Admin",
                    Email = "admin@test.com",
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }


            if (context.Products.Any() || context.Categories.Any() || context.Brands.Any()) return;

            var categories = new List<Category>()
            {
                new Category
                {
                    Name = "Racket",
                },
                new Category
                {
                    Name = "Shoes",
                },
            };

            var brands = new List<Brand>()
            {
                new Brand
                {
                    Name = "Yonex",
                    Country = "Japan"
                },
                new Brand
                {
                    Name = "Lining",
                    Country = "China"
                },
            };

            var products = new List<Product>()
            {
                new Product
                {
                    Name = "Z-Force LTD",
                    Description = "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 2700000,
                    QuantityInStock = 10,
                    PictureUrl = "/images/products/zforce1.png",
                    Status = true,
                    Category = categories[0],
                    Brand = brands[0],
                }
            };

            foreach (var category in categories)
            {
                context.Categories.Add(category);
            }

            foreach(var brand in brands)
            {
                context.Brands.Add(brand);
            }

            foreach(var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}
