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
    
}