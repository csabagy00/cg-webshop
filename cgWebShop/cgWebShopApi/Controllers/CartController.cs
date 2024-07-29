using cgWebShopApi.Models;
using cgWebShopApi.Respositories.Cart;
using Microsoft.AspNetCore.Mvc;

namespace cgWebShopApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CartController : ControllerBase
{
    private readonly ILogger<CartController> _logger;
    private readonly ICartRepository _cartRepository;

    public CartController(ILogger<CartController> logger, ICartRepository cartRepository)
    {
        _logger = logger;
        _cartRepository = cartRepository;
    }

    [HttpGet]
    public async Task<ActionResult<Cart>> GetCartByUserId(string userId)
    {
        try
        {
            var cart = await _cartRepository.GetCartByUserId(userId);

            return Ok(cart);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    [HttpPost]
    public async Task<ActionResult> CreateNewCart(string email)
    {
        try
        {
            var cart = await _cartRepository.AddNewCart(email);

            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    [HttpPost("Item")]
    public async Task<ActionResult> AddNewCartItemToCart([FromBody]Product product, string userId, int quantity)
    {
        try
        { 
            var result = await _cartRepository.AddNewCartItemToCart(product, userId, quantity);

            if (result == null)
                return BadRequest();
            
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveItemFromCart(int itemId)
    {
        try
        { 
            var result = await _cartRepository.RemoveCartItemFromCart(itemId);

            if (result == false)
                return NotFound();
            
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }
}