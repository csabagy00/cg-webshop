using System.Reflection.Metadata;

namespace cgWebShopApi.Services.Authentication;

public record AuthResult(
    bool Success,
    string Id,
    string Email,
    string Username,
    string Token,
    string First,
    string? Middle,
    string Last,
    string Phone,
    string Role
)
{
    public readonly Dictionary<string, string> ErrorMessages = new();
}
