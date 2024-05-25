using Microsoft.AspNetCore.Identity;

namespace cgWebShopApi.Models;

public class AppUser : IdentityUser
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }
}