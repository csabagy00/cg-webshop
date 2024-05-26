using System.Diagnostics.CodeAnalysis;
using cgWebShopApi.Models;
using cgWebShopApi.Respositories.Category;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace cgWebShopApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoryController
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
            return (categories);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }
}