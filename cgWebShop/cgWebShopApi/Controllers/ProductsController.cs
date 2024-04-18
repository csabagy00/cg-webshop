using cgWebShopApi.Models;
using cgWebShopApi.Respositories;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace cgWebShopApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private readonly string ConnectionString;
    private readonly ILogger<ProductsController> _logger;
    private readonly IProductsRepository _productsRepository;

    public ProductsController(ILogger<ProductsController> logger)
    {
        ConnectionString = "Server=localhost;Port=5432;User Id=postgres;Password=postgres;Database=cgwebshop";
        _logger = logger;
        _productsRepository = new ProductsRepository(new NpgsqlConnection(ConnectionString));
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        try
        {
            var products = await _productsRepository.GetAllProducts();
            return Ok(products);
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Error getting products: {e.Message}");
            throw;
        }
    }

    [HttpGet("id")]
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
        try
        {
            var product = await _productsRepository.GetProductById(id);
            return Ok(product);
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Error getting product with {id} ID: {e.Message}");
            throw;
        }
    }

    [HttpPost]
    public async Task<ActionResult<Product>> AddNewProduct(Product product)
    {
        try
        {
            await _productsRepository.AddNewProduct(product);
            
            return Ok(product);
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Error posting new product: {e.Message}");
            throw;
        }
    }

    [HttpDelete]
    public async Task<ActionResult<Product>> DeleteProductById(int id)
    {
        try
        {
            await _productsRepository.DeleteOneProduct(id);
            
            return Ok(id);
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Error deleting the product: {e.Message}");
            throw;
        }
    }

    [HttpPatch]
    public async Task<ActionResult<Product>> PatchProductById(int id, Product product)
    {
        try
        {
            await _productsRepository.UpdateProductById(id, product);
            
            return Ok(product);
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Error updating product with id {id}: {e.Message}");
            throw;
        }
    }
}