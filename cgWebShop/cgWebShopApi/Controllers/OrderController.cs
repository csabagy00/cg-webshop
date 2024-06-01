using System.Security.Claims;
using cgWebShopApi.Data;
using cgWebShopApi.DTO;
using cgWebShopApi.Models;
using cgWebShopApi.Respositories.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cgWebShopApi.Controllers;

[ApiController]
[Route("[controller]"), Authorize(Roles = "Admin, User")]
public class OrderController : ControllerBase
{
    private readonly IOrderRepository _orderRepository;
    private readonly ILogger<OrderController> _logger;
    private readonly UserManager<AppUser> _userManager;
    private readonly CgShopContext _dbContext;

    public OrderController(IOrderRepository orderRepository, ILogger<OrderController> logger, UserManager<AppUser> userManager, CgShopContext dbContext)
    {
        _orderRepository = orderRepository;
        _logger = logger;
        _userManager = userManager;
        _dbContext = dbContext;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrderById([FromRoute]int id)
    {
        try
        {
            var order = await _orderRepository.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    [HttpGet("userId")]
    public async Task<ActionResult<List<Order>>> GetOrdersByUserId(string userId)
    {
        try
        {
            var orders = await _orderRepository.GetOrdersByUserId(userId);
            if (orders.Count == 0)
            {
                return NotFound();
            }
            return Ok(orders);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    [HttpDelete]
    public async Task<ActionResult<int>> RemoveOrderById(int id)
    {
        try
        {
            await _orderRepository.RemoveOrder(id);

            return NoContent();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateNewOrder([FromBody]OrderDto orderDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var userId = User.FindAll(ClaimTypes.NameIdentifier).Skip(1).FirstOrDefault().Value;
            var user = await _userManager.FindByIdAsync(userId);

            Order order = new Order
            {
                Address = orderDto.Address,
                AppUser = user,
                City = orderDto.City,
                Country = orderDto.Country,
                Date = orderDto.Date,
                PostalCode = orderDto.PostalCode,
                Products = new List<OrderedProduct>()
            };

            foreach (var productDto in orderDto.Products)
            {
                var product = await _dbContext.Products
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Id == productDto.Id);

                var orderedProduct = new OrderedProduct { Product = product! };
                
                order.Products.Add(orderedProduct);
            }
            
            order.AppUser = user;
            
            await _orderRepository.AddNewOrder(order);

            return Ok(order);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }
}