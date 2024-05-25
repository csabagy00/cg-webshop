using Microsoft.AspNetCore.Mvc;

namespace cgWebShopApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoryController
{
    private ILogger<CategoryController> _logger;

    public CategoryController(ILogger<CategoryController> logger)
    {
        _logger = logger;
    }
}