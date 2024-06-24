using cgWebShopApi.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace cgWebshop_IntegrationTests;

public class CgWebShopApiWebAppFactory : WebApplicationFactory<Program>
{
    private readonly string _dbName = Guid.NewGuid().ToString();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var contextDescriptor =
                services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<CgShopContext>));

            services.Remove(contextDescriptor);

            services.AddDbContext<CgShopContext>(options => options.UseInMemoryDatabase(_dbName));

            using var scope = services.BuildServiceProvider().CreateScope();

            var cgShopContext = scope.ServiceProvider.GetRequiredService<CgShopContext>();
            cgShopContext.Database.EnsureDeleted();
            cgShopContext.Database.EnsureCreated();
        });
    }
}