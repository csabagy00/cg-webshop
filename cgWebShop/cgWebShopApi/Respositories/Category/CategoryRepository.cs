using cgWebShopApi.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace cgWebShopApi.Respositories.Category;

public class CategoryRepository : ICategoryRepository
{
    private readonly CgShopContext _dbContext;
    private readonly ILogger<CategoryRepository> _logger;

    public CategoryRepository(ILogger<CategoryRepository> logger, CgShopContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }
    
    public async Task<List<Models.Category>> GetAllCategories()
    {
        try
        {
            return await _dbContext.Categories.ToListAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task<Models.Category> GetCategoryById(int id)
    {
        try
        {
            var category = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
            
            return category;
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task AddNewCategory()
    {
        throw new NotImplementedException();
    }
}