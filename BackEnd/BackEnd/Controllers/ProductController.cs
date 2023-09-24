using AutoMapper;
using BackEnd.Data;
using BackEnd.DTOs;
using BackEnd.Entities;
using BackEnd.Extensions;
using BackEnd.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    public class ProductController : BaseAPIController
    {
        private readonly AppDBContext _db;
        private readonly IMapper _mapper;
        public ProductController(AppDBContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetProducts")]
        public async Task<ActionResult<List<Product>>> GetAllFilters([FromQuery] ProductParams productParams)
        {

            var products = await _db.Products.Include(p => p.Category).Include(p => p.Brand)
                                            .SortProduct(productParams.OrderBy)
                                            .SearchProduct(productParams.SearchTerm)
                                            .FiltersProduct(productParams.Category, productParams.Brand)
                                            .ToListAsync();

            if (products == null) return NotFound();
            return products;
        }

        [HttpGet("filters")]
        public async Task<ActionResult> GetFilterCategory()
        {
            var category = await _db.Products.Select(p => p.Category.Name).Distinct().ToListAsync();
            var brand = await _db.Products.Select(p => p.Brand.Name).Distinct().ToListAsync();

            return Ok(new { category, brand });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _db.Products.Include(p => p.Category).Include(p => p.Brand).SingleOrDefaultAsync(p => p.Id == id);
            if (product == null) return NotFound();
            return product;
        }

        [HttpPost]
        public async Task<ActionResult> CreateProduct([FromForm] CreateProductDTO productDTO)
        {
            var product = _mapper.Map<Product>(productDTO);

            if (productDTO.File?.Length > 0)
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "products", productDTO.File.FileName);
                using (var stream = System.IO.File.Create(path))
                {
                    await productDTO.File.CopyToAsync(stream);
                }

                product.PictureUrl = "/images/products/" + productDTO.File.FileName;
            } else
            {
                product.PictureUrl = "/images/products/default-image.png";
            }

            _db.Products.Add(product);
            var result = await _db.SaveChangesAsync() > 0;
            if (result) return Ok(product);
            return BadRequest(new ProblemDetails { Title = "Problem Create Product" });
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProduct([FromForm] UpdateProductDTO productDTO)
        {
            var product = await _db.Products.FindAsync(productDTO.Id);
            if (product == null) return NotFound();

            _mapper.Map(productDTO, product);

            if (productDTO.File?.Length > 0)
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "products", productDTO.File.FileName);
                using (var stream = System.IO.File.Create(path))
                {
                    await productDTO.File.CopyToAsync(stream);
                }

                product.PictureUrl = "/images/products/" + productDTO.File.FileName;
            }

            var result = await _db.SaveChangesAsync() >= 0;
            if (result) return Ok(product);
            return BadRequest(new ProblemDetails { Title = "Problem Update Product" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if(product == null) return NotFound();

            _db.Remove(product);

            var result = await _db.SaveChangesAsync() > 0;
            if (result) return Ok(product);
            return BadRequest(new ProblemDetails { Title = "Problem Delete Product" });
        }
    }
}
