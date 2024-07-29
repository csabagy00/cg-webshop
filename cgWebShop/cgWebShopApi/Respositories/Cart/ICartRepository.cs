using cgWebShopApi.Models;

namespace cgWebShopApi.Respositories.Cart;

public interface ICartRepository
{
    public Task<Models.Cart> GetCartByUserId(string id);
    public Task<Models.Cart> AddNewCart(string email);

    public Task<CartItem?> AddNewCartItemToCart(Product product, string userId, int quantity);
    public Task<bool> RemoveCartItemFromCart(int id);
    public Task<bool> RemoveAllItemsFromCart(string userId);
}