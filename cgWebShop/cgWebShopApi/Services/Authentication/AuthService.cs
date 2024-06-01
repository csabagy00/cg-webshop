using cgWebShopApi.Models;
using Microsoft.AspNetCore.Identity;

namespace cgWebShopApi.Services.Authentication;

public class AuthService : IAuthService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;

    public AuthService(UserManager<AppUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<AuthResult> RegisterAsync(string email, string username, string first, string? middle,
        string last, string phone, string password, string role)
    {
        var user = new AppUser
        {
            Email = email,
            UserName = username,
            FirstName = first,
            MiddleName = middle,
            LastName = last,
            Phone = phone
        };
        var result = await _userManager.CreateAsync(user, password);

        if (!result.Succeeded)
            return FailedRegistration(result, email, username);

        await _userManager.AddToRoleAsync(user, role);
        return new AuthResult(true, "",email, username, "", first, middle, last, phone, "");
    }

    public async Task<AuthResult> LoginAsync(string email, string password)
    {
        var managedUser = await _userManager.FindByEmailAsync(email);

        if (managedUser == null)
            return InvalidEmail(email);

        var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, password);
        if (!isPasswordValid)
            return InvalidPassword(email, managedUser.UserName!);

        var roles = await _userManager.GetRolesAsync(managedUser);
        var accessToken = _tokenService.CreateToken(managedUser, roles[0]);

        return new AuthResult(true,
            managedUser.Id,
            managedUser.Email, 
            managedUser.UserName, 
            accessToken, managedUser.FirstName, 
            managedUser.MiddleName, 
            managedUser.LastName, 
            managedUser.Phone, 
            roles[0]);
    }

    private static AuthResult FailedRegistration(IdentityResult result, string email, string username)
    {
        var authResult = new AuthResult(false,"" ,email, username, "", "","","", "", "");

        foreach (var error in result.Errors)
        {
            authResult.ErrorMessages.Add(error.Code, error.Description);
        }

        return authResult;
    }

    private static AuthResult InvalidEmail(string email)
    {
        var result = new AuthResult(false,"" ,email, "", "", "", "", "", "","");
        result.ErrorMessages.Add("Bad credentials", "Invalid email");
        return result;
    }

    private static AuthResult InvalidPassword(string email, string username)
    {
        var result = new AuthResult(false,"" ,email, username, "", "", "", "", "", "");
        result.ErrorMessages.Add("Bad credentials", "Invalid email");
        return result;
    }
}