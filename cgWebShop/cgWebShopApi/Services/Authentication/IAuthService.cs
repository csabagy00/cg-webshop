namespace cgWebShopApi.Services.Authentication;

public interface IAuthService
{
    Task<AuthResult> RegisterAsync(string email, string username, string first, string? middle, string last, string phone, string password, string role);
    Task<AuthResult> LoginAsync(string email, string password);
}