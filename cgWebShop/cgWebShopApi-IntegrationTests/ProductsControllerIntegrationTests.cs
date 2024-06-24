using System.Net;

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

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}