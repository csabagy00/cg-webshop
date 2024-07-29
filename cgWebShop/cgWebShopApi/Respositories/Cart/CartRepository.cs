using cgWebShopApi.Data;
using cgWebShopApi.Models;
using Microsoft.EntityFrameworkCore;

namespace cgWebShopApi.Respositories.Cart;

public class CartRepository : ICartRepository
{
    private readonly CgShopContext _dbContext;
    private readonly ILogger<CartRepository> _logger;

    public CartRepository(ILogger<CartRepository> logger, CgShopContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    public async Task<Models.Cart> GetCartByUserId(string id)
    {
        try
        {
            var cart = await _dbContext.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .ThenInclude(p => p.Category)
                .FirstOrDefaultAsync(c => c.UserId == id);

            if (cart == null)
            {
                Models.Cart newCart = new Models.Cart { UserId = id, CartItems = new List<CartItem>() };

                return newCart;
            }

            return cart;
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task<Models.Cart> AddNewCart(string email)
    {
        try
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            Models.Cart newCart = new Models.Cart { UserId = user.Id, CartItems = new List<CartItem>() };

            await _dbContext.Carts.AddAsync(newCart);
            await _dbContext.SaveChangesAsync();

            return newCart;
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task<CartItem?> AddNewCartItemToCart(Product product, string userId, int quantity)
    {
        try
        {
            var cart = await _dbContext.Carts.FirstOrDefaultAsync(c => c.UserId == userId);

            Models.Cart newCart = new Models.Cart { UserId = userId, CartItems = new List<CartItem>() };
            
            CartItem item = new CartItem{ Cart = cart ?? newCart, Product = product, Quantity = quantity};

            await _dbContext.CartItems.AddAsync(item);
        
            _dbContext.Entry(item.Product.Category).State = EntityState.Unchanged;
            _dbContext.Entry(item.Product).State = EntityState.Unchanged;
        
            await _dbContext.SaveChangesAsync();

            return item;
            
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task<bool> RemoveCartItemFromCart(int id)
    {
        try
        {
            var item = await _dbContext.CartItems.FirstOrDefaultAsync(ci => ci.Id == id);

            if (item == null)
            {
                return false;
            }
            _dbContext.CartItems.Remove(item);
            await _dbContext.SaveChangesAsync();

            return true;
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task<bool> RemoveAllItemsFromCart(string userId)
    {
        try
        {
            var cart = await _dbContext.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                return false;

            foreach (var cartItem in cart.CartItems)
            {
                _dbContext.CartItems.Remove(cartItem);
            }

            _dbContext.Carts.Remove(cart);
            await _dbContext.SaveChangesAsync();

            return true;
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

}