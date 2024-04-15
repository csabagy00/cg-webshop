using cgWebShopApi.Models;

namespace cgWebShopApi.Respositories;

public interface IProductsRepository
{
    Task<List<Product>> GetAllProducts();

    Product GetProductById(int id);
}