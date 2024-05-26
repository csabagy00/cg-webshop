using Microsoft.AspNetCore.Identity;

namespace cgWebShopApi.Models;

public class AppUser : IdentityUser
{
    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}