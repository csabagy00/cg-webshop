using cgWebShopApi.Models;
using Microsoft.AspNetCore.Identity;

namespace cgWebShopApi.Services.Role;

public class RoleService : IRoleService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public RoleService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<bool> ChangeUserRole(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
            return false;

        var currentRoles = await _userManager.GetRolesAsync(user);

        var removeRoles = await _userManager.RemoveFromRoleAsync(user, currentRoles[0]);
        
        if (!removeRoles.Succeeded)
            return false;

        var addRole = await _userManager.AddToRoleAsync(user, "Admin");
        return addRole.Succeeded;
    }
}