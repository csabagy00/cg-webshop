using cgWebShopApi.Models;

namespace cgWebShopApi.Respositories;

public interface IProductsRepository
{
    Task<List<Product>> GetAllProducts();

    Task<Product> GetProductById(int id);

    Task AddNewProduct(Product product);

    Task DeleteOneProduct(int id);
}