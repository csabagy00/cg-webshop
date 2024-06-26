using cgWebShopApi.Models;
using Microsoft.AspNetCore.Identity;

namespace cgWebShopApi.Services.Authentication;

public class AuthenticationSeeder
{
    private RoleManager<IdentityRole> _roleManager;
    private UserManager<AppUser> _userManager;
    private IConfigurationRoot _configurationRoot;

    public AuthenticationSeeder(RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
        _configurationRoot = new ConfigurationBuilder().AddUserSecrets<Program>().Build();
    }

    public void AddRoles()
    {
        var taskAdmin = CreateAdminRole();
        taskAdmin.Wait();

        var taskUser = CreateUserRole();
        taskUser.Wait();
    }

    public void AddAdmin()
    {
        var taskAdmin = CreateAdminIfNotExists();
        taskAdmin.Wait();
    }

    private async Task CreateAdminIfNotExists()
    {
        var adminInDb = await _userManager.FindByEmailAsync("admin@admin.com");
        if (adminInDb == null)
        {
            var admin = new AppUser
            {
                Email = "admin@admin.com",
                UserName = "admin", 
                FirstName = "Admin", 
                MiddleName = null, 
                LastName = "Admin", 
                Phone = "12345"
            };
            var adminCreated = await _userManager.CreateAsync(admin, "admin123");

            if (adminCreated.Succeeded)
            {
                await _userManager.AddToRoleAsync(admin, _configurationRoot["Roles:1"]);
            }
        }
    }

    private async Task CreateAdminRole()
    {
        var role = Environment.GetEnvironmentVariable("ROLE_1") ?? _configurationRoot["Roles:1"];
        await _roleManager.CreateAsync(new IdentityRole(role));
    }

    private async Task CreateUserRole()
    {
        var role = Environment.GetEnvironmentVariable("ROLE_2") ?? _configurationRoot["Roles:2"];
        await _roleManager.CreateAsync(new IdentityRole(role));
    }
}