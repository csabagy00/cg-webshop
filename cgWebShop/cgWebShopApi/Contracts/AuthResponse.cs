namespace cgWebShopApi.Contracts;

public record AuthResponse(
    string Id,
    string Email, 
    string Username, 
    string Token, 
    string First, 
    string Middle, 
    string Last, 
    string Phone,
    string Role);