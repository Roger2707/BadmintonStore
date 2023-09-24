using BackEnd.Data;
using BackEnd.DTOs.Identity;
using BackEnd.Entities;
using BackEnd.Entities.OrderAggregate;
using BackEnd.Extensions;
using BackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    public class AccountController : BaseAPIController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly AppDBContext _db;
        public AccountController(UserManager<User> userManager, TokenService tokenService, AppDBContext db)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _db = db;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password)) return Unauthorized();

            var annonymousBasket = await RetrieveBasket(Request.Cookies["buyerId"]);
            var userBasket = await RetrieveBasket(loginDTO.Username);

            if(annonymousBasket != null)
            {
                if (userBasket != null) _db.Baskets.Remove(userBasket);
                annonymousBasket.BuyerId = loginDTO.Username;
                Response.Cookies.Delete("buyerId");
                await _db.SaveChangesAsync();
            }

            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = annonymousBasket != null ? annonymousBasket.MapBasketToDTO() : userBasket?.MapBasketToDTO(),
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO registerDTO)
        {
            var user = new User { UserName = registerDTO.Username, Email = registerDTO.Email };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if(!result.Succeeded)
            {
                foreach(var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var basket = await RetrieveBasket(User.Identity.Name);

            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = basket?.MapBasketToDTO(),
            };
        }

        [Authorize]
        [HttpGet("savedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            return await _userManager.Users
                .Where(x => x.UserName == User.Identity.Name)
                .Select(user => user.UserAddress)
                .FirstOrDefaultAsync();
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (String.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _db.Baskets.Include(b => b.BasketItems)
                                    .ThenInclude(i => i.Product)
                                    .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }
    }
}
