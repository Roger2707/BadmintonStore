using AutoMapper;
using BackEnd.Data;
using BackEnd.DTOs;
using BackEnd.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    public class CategoryController : BaseAPIController
    {
        private readonly AppDBContext _db;
        private readonly IMapper _mapper;
        public CategoryController(AppDBContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        [HttpGet(Name = "GetCategory")]
        public async Task<ActionResult<List<Category>>> GetAll()
        {
            var categories = await _db.Categories.ToListAsync();
            if (categories == null) return NotFound();
            return categories;
        }

        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory([FromForm] CreateCategoryDTO categoryDTO)
        {
            var category = _mapper.Map<Category>(categoryDTO);
            _db.Categories.Add(category);

            var result = await _db.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetCategory", new { id = category.Id }, category);
            return BadRequest(new ProblemDetails { Title = "Problem Create Category" });
        }

        [HttpPut]
        public async Task<ActionResult> UpdateCategory([FromForm] UpdateCategoryDTO categoryDTO)
        {
            var category = await _db.Categories.FindAsync(categoryDTO.Id);
            if (category == null) return NotFound();
            _mapper.Map(categoryDTO, category);

            var result = await _db.SaveChangesAsync() > 0;
            if (result) return Ok(category);
            return BadRequest(new ProblemDetails { Title = "Problem Update Category" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleleCategory(int id)
        {
            var category = await _db.Categories.FindAsync(id);
            if (category == null) return NotFound();
            _db.Categories.Remove(category);
            var result = await _db.SaveChangesAsync() > 0;  
            if(result) return Ok(category);
            return BadRequest(new ProblemDetails { Title = "Problem Deleting Category" });
        }

    }
}
