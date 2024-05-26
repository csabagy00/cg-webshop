namespace cgWebShopApi.Respositories.Category;

public interface ICategoryRepository
{
    Task<List<Models.Category>> GetAllCategories();

    Task<Models.Category> GetCategoryById(int id);

    Task AddNewCategory();
}