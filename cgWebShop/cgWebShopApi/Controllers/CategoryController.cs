using System.Diagnostics.CodeAnalysis;
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
}