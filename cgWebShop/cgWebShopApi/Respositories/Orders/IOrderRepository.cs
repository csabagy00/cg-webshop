using cgWebShopApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace cgWebShopApi.Respositories.Orders;

public interface IOrderRepository
{
    Task<Order> GetOrderById(int id);

    Task<List<Order>> GetOrdersByUserId(string id);

    Task AddNewOrder(Order order);

    Task RemoveOrder(int id);
}