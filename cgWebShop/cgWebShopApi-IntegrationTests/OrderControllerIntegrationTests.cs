using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using cgWebShopApi.Contracts;
using cgWebShopApi.DTO;
using cgWebShopApi.Models;
using Microsoft.AspNetCore.Identity;

namespace cgWebshop_IntegrationTests;

[Collection("IntegrationTests")]
public class OrderControllerIntegrationTests
{
    private readonly CgWebShopApiWebAppFactory _app;
    private readonly HttpClient _client;
    private readonly OrderDto _order;
    
    public OrderControllerIntegrationTests()
    {
        var category = new CategoryDto()
        {
            Name = "Test"
        };
        
        var product = new ProductDto()
        {
            Id = 1,
            Category = category,
            Name = "TestProd",
            InStock = 2,
            Price = 50,
            Img = null
        };
        
        _app = new CgWebShopApiWebAppFactory();
        _client = _app.CreateClient();
        _order = new OrderDto()
        {
            Products = new List<ProductDto>()
            {
                product
            },
            Address = "Test Address",
            City = "Test City",
            Country = "Test Country",
            Date = DateTime.Now,
            PostalCode = 12345
        };
    }

    [Fact]
    public async Task PostOrderOk()
    {
        var loginObj = new { Email = "admin@admin.com", Password = "admin123" };

        var loginRes = await _client.PostAsJsonAsync("/Auth/Login", loginObj);
        loginRes.EnsureSuccessStatusCode();

        var loginResult = await loginRes.Content.ReadFromJsonAsync<AuthResponse>();

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", loginResult.Token);

        var response = await _client.PostAsJsonAsync("/Order", _order);

        var getRes = await _client.GetAsync($"/Order/1");
        var getResult = await getRes.Content.ReadFromJsonAsync<Order>();
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(getResult);
        Assert.True(getResult.Products.Count > 0);
    }

    [Fact]
    public async Task GetOrderById()
    {
        var loginObj = new { Email = "admin@admin.com", Password = "admin123" };
        var loginRes = await _client.PostAsJsonAsync("/Auth/Login", loginObj);
        loginRes.EnsureSuccessStatusCode();
        var loginResult = await loginRes.Content.ReadFromJsonAsync<AuthResponse>();

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", loginResult.Token);

        var postRes = await _client.PostAsJsonAsync("/Order", _order);
        postRes.EnsureSuccessStatusCode();
        
        var response = await _client.GetAsync($"Order/1");

        var order = await response.Content.ReadFromJsonAsync<Order>();
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotEmpty(order.Products);
    }

    [Fact]
    public async Task GetOrderByIdNotFound()
    {
        var lognObj = new { Email = "admin@admin.com", Password = "admin123" };
        var loginRes = await _client.PostAsJsonAsync("/Auth/Login", lognObj);
        loginRes.EnsureSuccessStatusCode();
        var loginResult = await loginRes.Content.ReadFromJsonAsync<AuthResponse>();

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", loginResult.Token);

        var getRes = await _client.GetAsync("/Order/1");
        
        Assert.Equal(HttpStatusCode.NotFound, getRes.StatusCode);
    }

    [Fact]
    public async Task GetOrderByUserIdOk()
    {
        var loginobj = new { Email = "admin@admin.com", Password = "admin123" };
        var loginRes = await _client.PostAsJsonAsync("/Auth/login", loginobj);
        loginRes.EnsureSuccessStatusCode();
        var loginResult = await loginRes.Content.ReadFromJsonAsync<AuthResponse>();

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", loginResult.Token);

        var postRes = await _client.PostAsJsonAsync("/Order", _order);
        postRes.EnsureSuccessStatusCode();

        var getRes = await _client.GetAsync($"/Order/userId?userId={loginResult.Id}");
        var result = await getRes.Content.ReadFromJsonAsync<List<Order>>();
        
        Assert.Equal(HttpStatusCode.OK, getRes.StatusCode);
        Assert.IsType<List<Order>>(result);
        Assert.True(result.Count > 0);
    }

    [Fact]
    public async Task GetOrderByUserIdIfNoOrdersNotFound()
    {
        var loginObj = new { Email = "admin@admin.com", Password = "admin123" };
        var loginRes = await _client.PostAsJsonAsync("/Auth/Login", loginObj);
        loginRes.EnsureSuccessStatusCode();
        var loginResult = await loginRes.Content.ReadFromJsonAsync<AuthResponse>();

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", loginResult.Token);

        var getRes = await _client.GetAsync($"/Order/userId?userId={loginResult.Id}");
        
        Assert.Equal(HttpStatusCode.NotFound, getRes.StatusCode);
    }

    [Fact]
    public async Task DeleteOrderByIdNoContent()
    {
        var loginObj = new { Email = "admin@admin.com", Password = "admin123" };
        var loginRes = await _client.PostAsJsonAsync("/Auth/Login", loginObj);
        loginRes.EnsureSuccessStatusCode();
        var loginResult = await loginRes.Content.ReadFromJsonAsync<AuthResponse>();

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", loginResult.Token);

        var postRes = await _client.PostAsJsonAsync("/Order", _order);
        postRes.EnsureSuccessStatusCode();

        var deleteRes = await _client.DeleteAsync("/Order?id=1");
        
        Assert.Equal(HttpStatusCode.NoContent, deleteRes.StatusCode);
    }

    [Fact]
    public async Task DeleteOrderByIdNotFound()
    {
        var loginObj = new { Email = "admin@admin.com", Password = "admin123" };
        var loginRes = await _client.PostAsJsonAsync("/Auth/Login", loginObj);
        loginRes.EnsureSuccessStatusCode();
        var loginResult = await loginRes.Content.ReadFromJsonAsync<AuthResponse>();

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", loginResult.Token);

        var deleteRes = await _client.DeleteAsync("/Order?id=1");
        
        Assert.Equal(HttpStatusCode.NotFound, deleteRes.StatusCode);
    }
}