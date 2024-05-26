using cgWebShopApi.Models;

namespace cgWebShopApi.Services.Authentication;

public interface ITokenService
{
    string CreateToken(AppUser user, string role);
}