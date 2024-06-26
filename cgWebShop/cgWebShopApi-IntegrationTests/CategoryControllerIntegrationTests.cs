using System.Net;
using System.Net.Http.Json;
using cgWebShopApi.DTO;
using cgWebShopApi.Models;
using Microsoft.VisualBasic.CompilerServices;

namespace cgWebshop_IntegrationTests;

[Collection("IntegrationTests")]
public class CategoryControllerIntegrationTests
{
    private readonly CgWebShopApiWebAppFactory _app;
    private readonly HttpClient _client;

    public CategoryControllerIntegrationTests()
    {
        _app = new CgWebShopApiWebAppFactory();
        _client = _app.CreateClient();
    }

    [Fact]
    public async Task GetAllCategory()
    {
        var response = await _client.GetAsync("/Category");

        var list = await response.Content.ReadFromJsonAsync<List<Category>>();
        
        Assert.NotNull(list);
        Assert.NotEmpty(list);
        Assert.True(list.Count == 3);
    }

    [Fact]
    public async Task GetCategoryById()
    {
        var response = await _client.GetAsync("/Category/id?id=1");
        var result = await response.Content.ReadFromJsonAsync<Category>();
        
        Assert.Equal(1, result.Id);
        Assert.NotEmpty(result.Name);
    }

    [Fact]
    public async Task PostNewCategory()
    {
        var category = new Category() { Name = "newCat" };

        var response = await _client.PostAsJsonAsync("/Category", category);

        var result = await _client.GetAsync("/Category");
        var list = await result.Content.ReadFromJsonAsync<List<Category>>();
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Contains(list, c => c.Name == category.Name);
    }

    [Fact]
    public async Task TryDeleteCategoryThatNotExsists()
    {
        var response = await _client.DeleteAsync("/Category?id=1");
        
        Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
    }

    [Fact]
    public async Task DeleteCategoryById()
    {
        var category = new CategoryDto { Name = "newCat"};
        await _client.PostAsJsonAsync("/Category", category);
        
        var fetchedRes = await _client.GetAsync("/Category/id?id=4");
        var fetched = await fetchedRes.Content.ReadFromJsonAsync<Category>();
        
        Assert.NotNull(fetched);
        Assert.Empty(fetched.Products);

        var response = await _client.DeleteAsync("/Category?id=4");
        
        var getResponse = await _client.GetAsync("/Category");
        var list = await getResponse.Content.ReadFromJsonAsync<List<Category>>();
        
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        Assert.DoesNotContain(list, c => c.Name == category.Name);
    }

    [Fact]
    public async Task DeleteWithBadUri()
    {
        var response = await _client.DeleteAsync("/Category");
        
        Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
    }
}