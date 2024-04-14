using cgWebShopApi.Models;

namespace cgWebShopApi.Respositories;

public interface IProductsRepository
{
    List<Product> GetAllProducts();

    Product GetProductById(int id);
}