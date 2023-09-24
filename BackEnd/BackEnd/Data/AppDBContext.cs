using BackEnd.Entities;
using BackEnd.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Data
{
    public class AppDBContext : IdentityDbContext<User, Role, int>
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasOne(i => i.UserAddress)
                .WithOne()
                .HasForeignKey<UserAddress>(i => i.Id)
                .OnDelete(DeleteBehavior.Cascade);
                

            builder.Entity<Role>()
                .HasData(
                   new Role { Id = 1, Name = "Member", NormalizedName = "MEMBER" },
                   new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
    }
}
