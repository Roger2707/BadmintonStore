using AutoMapper;
using BackEnd.Data;
using BackEnd.DTOs;
using BackEnd.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    public class BrandController : BaseAPIController
    {
        private readonly AppDBContext _db;
        private readonly IMapper _mapper;
        public BrandController(AppDBContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        [HttpGet(Name = "GetBrand")]
        public async Task<ActionResult<List<Brand>>> GetAll()
        {
            var brands = await _db.Brands.ToListAsync();
            if(brands == null) return NotFound();
            return brands;
        }

        [HttpPost]
        public async Task<ActionResult<Brand>> CreateBrand([FromForm] CreateBrandDTO brandDTO)
        {
            var brand = _mapper.Map<Brand>(brandDTO);
            _db.Brands.Add(brand);
            var result = await _db.SaveChangesAsync() > 0;
            if(result) return CreatedAtRoute("GetBrand", new { Id = brand.Id }, brand);
            return BadRequest(new ProblemDetails { Title = "Problem Creating Brand !"});
        }

        [HttpPut]
        public async Task<ActionResult> UpdateBrand([FromForm] UpdateBrandDTO brandDTO)
        {
            var brand = await _db.Brands.FindAsync(brandDTO.Id);
            if (brand == null) return NotFound();
            _mapper.Map(brandDTO, brand);
            var result = await _db.SaveChangesAsync() > 0;
            if (result) return Ok(brand);
            return BadRequest(new ProblemDetails { Title = "Problem Updating Brand !" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBrand(int id)
        {
            var brand = await _db.Brands.FindAsync(id);
            if (brand == null) return NotFound();
            _db.Remove(brand);
            var result = await _db.SaveChangesAsync() > 0;
            if(result) return Ok(brand);
            return BadRequest(new ProblemDetails { Title = "Problem Deleting Brand !" });
        }
    }
}
