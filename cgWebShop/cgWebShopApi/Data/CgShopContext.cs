using cgWebShopApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace cgWebShopApi.Data;

public class CgShopContext : IdentityDbContext<AppUser, IdentityRole, string>
{
    public CgShopContext(DbContextOptions<CgShopContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<OrderedProduct> OrderedProducts { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        Category tech = new Category { Id = 1, Name = "Tech"};
        Category garden = new Category { Id = 2, Name = "Garden"};
        Category home = new Category { Id = 3, Name = "Home" };
        
        List<Category> categories = new List<Category> { tech, garden, home };

        builder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey("CategoryId")
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.Entity<Category>().HasData(categories);
        builder.Entity<Product>().HasData(
            new
            {
                Id = 1,
                Name = "Laptop",
                Price = 500,
                InStock = 5,
                Img = (string)null,
                CategoryId = 1
            },
            new
            {
                Id = 2,
                Name = "Tools Set",
                Price = 200,
                InStock = 5,
                Img = (string)null,
                CategoryId = 2
            },
            new
            {
                Id = 3,
                Name = "Sofa",
                Price = 700,
                InStock = 5,
                Img = (string)null,
                CategoryId = 3
            }
        );
    }
}