using System.Data;
using cgWebShopApi.Data;
using cgWebShopApi.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace cgWebShopApi.Respositories;

public class ProductsRepository : IProductsRepository
{
    private readonly CgShopContext _dbContext;
    private readonly ILogger<ProductsRepository> _logger;

    public ProductsRepository(CgShopContext dbContext, ILogger<ProductsRepository> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }
        
    
    public async Task<List<Product>> GetAllProducts()
    {
        try
        {
            return await _dbContext.Products
                .Include(p => p.Category)
                .ToListAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }


    public async Task<Product> GetProductById(int id)
    {
        try
        {
            return await _dbContext.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task AddNewProduct(Product product)
    {
        try
        {
            _dbContext.Entry(product.Category).State = EntityState.Unchanged;
            await _dbContext.AddAsync(product);
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task DeleteOneProduct(int id)
    {
        try
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product != null)
            {
                _dbContext.Products.Remove(product);
                await _dbContext.SaveChangesAsync();
            }
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task UpdateProductById(Product product)
    {
        try
        {
            var exsitingProduct = await _dbContext.Products.FindAsync(product.Id);
            if (exsitingProduct != null)
            {
                _dbContext.Entry(exsitingProduct).CurrentValues.SetValues(product);
                if (product.Category != null)
                    _dbContext.Entry(exsitingProduct.Category).State = EntityState.Unchanged;

                await _dbContext.SaveChangesAsync();
            }
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }
    
}