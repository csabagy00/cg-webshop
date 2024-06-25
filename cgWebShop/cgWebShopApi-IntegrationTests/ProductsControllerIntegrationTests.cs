using System.Net;
using System.Net.Http.Json;
using cgWebShopApi.Models;
using Microsoft.AspNetCore.WebUtilities;

namespace cgWebshop_IntegrationTests;

[Collection("IntegrationTests")]
public class ProductsControllerIntegrationTest
{
    private readonly CgWebShopApiWebAppFactory _app;
    private readonly HttpClient _client;

    public ProductsControllerIntegrationTest()
    {
        _app = new CgWebShopApiWebAppFactory();
        _client = _app.CreateClient();
    }

    [Fact]
    public async Task ProductsGetEndpointOk()
    {
        var response = await _client.GetAsync("/Products");

        var products = await response.Content.ReadFromJsonAsync<List<Product>>();

        var first = products.FirstOrDefault();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        Assert.NotNull(products);
        Assert.NotEmpty(products);
        
        Assert.NotNull(first);
        Assert.True(first.Id > 0);
        Assert.False(string.IsNullOrEmpty(first.Name));
        Assert.True(first.Price > 0);
        Assert.True(first.InStock >= 0);
    }

    [Fact]
    public async Task ProductsGetByIdOk()
    {
        var category = new Category()
        {
            Id = 1,
            Name = "Tech",
            Products = new List<Product>(){}
        };
        
        var newProduct = new Product()
        {
            Id = 0,
            Category = category,
            Name = "New Prod",
            InStock = 5,
            Price = 200,
            Img = null
        };

        var postResponse = await _client.PostAsJsonAsync("/Products", newProduct);
        postResponse.EnsureSuccessStatusCode();
        
        var response = await _client.GetAsync("/Products/id?id=1");

        var product = await response.Content.ReadFromJsonAsync<Product>();
        
        Assert.NotNull(product);
        Assert.Equal(1, product.Id);
        Assert.False(string.IsNullOrEmpty(product.Name));
        Assert.True(product.InStock == 5);
        Assert.True(product.Price > 0);
    }

    [Fact]
    public async Task ProductsGetNotFound()
    {
        var response = await _client.GetAsync("/Products/I");
        
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task ProductsPostOk()
    {
        var category = new Category()
        {
            Id = 1,
            Name = "Tech",
            Products = new List<Product>(){}
        };
        
        var product = new Product()
        
        {
            Id = 0,
            Category = category,
            Name = "New Prod",
            InStock = 5,
            Price = 200,
            Img = null
        };

        var response = await _client.PostAsJsonAsync("/Products", product);

        var returnedProduct = await response.Content.ReadFromJsonAsync<Product>();
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(returnedProduct);
        Assert.Equal("New Prod", returnedProduct.Name);
        Assert.True(product.Price > 0);
        Assert.True(product.InStock == 5);
    }

    [Fact]
    public async Task ProductsPostBadRequest()
    {
        
        var category = new Category()
        {
            Id = 1,
            Name = "Tech",
            Products = new List<Product>(){}
        };
        
        var product = new Product()
        {
            Id = 0,
            Category = category,
            Name = null,
            InStock = 5,
            Price = 200,
            Img = null
        };

        var response = await _client.PostAsJsonAsync("/Products", product);
        
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task DeleteByIdNoContent()
    {
        var category = new Category()
        {
            Id = 1,
            Name = "Tech",
            Products = new List<Product>(){}
        };
        
        var product = new Product()
        {
            Id = 0,
            Category = category,
            Name = "New Prod",
            InStock = 5,
            Price = 200,
            Img = null
        };

        await _client.PostAsJsonAsync("/Products", product);
        
        var response = await _client.DeleteAsync("/Products?id=1");

        var getResult = await _client.GetAsync("/Products/id?id=1");

        var getList = await _client.GetAsync("/Products");
        var list = await getList.Content.ReadFromJsonAsync<List<Product>>();
        
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, getResult.StatusCode);
        Assert.DoesNotContain(list, p => p.Id == 1);
    }
}