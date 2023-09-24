using BackEnd.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;

namespace BackEnd.Entities
{
    public class User : IdentityUser<int>
    {
        public UserAddress UserAddress { get; set; }
    }
}
