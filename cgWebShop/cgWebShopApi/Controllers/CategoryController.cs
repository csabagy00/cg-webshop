using System.Diagnostics.CodeAnalysis;
using cgWebShopApi.DTO;
using cgWebShopApi.Models;
using cgWebShopApi.Respositories.Category;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace cgWebShopApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ILogger<CategoryController> _logger;
    private readonly ICategoryRepository _categoryRepository;

    public CategoryController(ILogger<CategoryController> logger, ICategoryRepository categoryRepository)
    {
        _logger = logger;
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<ActionResult<List<Category>>> GetAllCategories()
    {
        try
        {
            var categories = await _categoryRepository.GetAllCategories();
            return Ok(categories);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    [HttpGet("id")]
    public async Task<ActionResult<Category>> GetCategoryById(int id)
    {
        try
        {
            var category = await _categoryRepository.GetCategoryById(id);

            if (category == null)
                return NotFound();

            return Ok(category);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    [HttpPost]
    public async Task<ActionResult<Category>> PostNewCategory([FromBody] CategoryDto categoryDto)
    {
        try
        {
            Category category = new Category { Name = categoryDto.Name };

            await _categoryRepository.AddNewCategory(category);

            return Ok(category);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    [HttpDelete]
    public async Task<ActionResult<int>> DeleteCategory(int id)
    {
        try
        {
            var category = await _categoryRepository.GetCategoryById(id);

            if (category.Products.Count > 0)
                return Conflict();

            await _categoryRepository.Deletecategory(category);

            return NoContent();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }
}