using cgWebShopApi.Data;
using cgWebShopApi.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cgWebShopApi.Respositories.Orders;

public class OrderRepository : IOrderRepository
{
    private readonly CgShopContext _dbContext;
    private readonly ILogger<OrderRepository> _logger;

    public OrderRepository(ILogger<OrderRepository> logger, CgShopContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }


    public async Task<ActionResult<Order>> GetOrderById(int id)
    {
        try
        {
            return await _dbContext.Orders
                .Include(o => o.AppUser)
                .Include(o => o.Products)
                .Include(o => o.Products)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task<ActionResult<List<Order>>> GetOrdersByUserId(string id)
    {
        try
        {
            return await _dbContext.Orders.Where(o => o.AppUser.Id == id).ToListAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task AddNewOrder(Order order)
    {
        try
        {
           
           await _dbContext.Orders.AddAsync(order);
           await _dbContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }

    public async Task RemoveOrder(int id)
    {
        try
        {
            var order = await _dbContext.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (order != null)
            {
                _dbContext.Orders.Remove(order);
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