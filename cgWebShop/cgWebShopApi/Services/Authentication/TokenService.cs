using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using cgWebShopApi.Models;
using Microsoft.IdentityModel.Tokens;

namespace cgWebShopApi.Services.Authentication;

public class TokenService : ITokenService
{
    private const int ExpirationMin = 60;
    private readonly IConfigurationRoot _configurationRoot;

    public TokenService(IConfigurationRoot configurationRoot)
    {
        _configurationRoot = configurationRoot;
    }

    public string CreateToken(AppUser user, string role)
    {
        var expiration = DateTime.UtcNow.AddMinutes(ExpirationMin);
        
        var token = CreateJwtToken(
            CreateClaims(user, role),
            CreateSigningCredentials(),
            expiration);

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    private JwtSecurityToken CreateJwtToken(List<Claim> claims, SigningCredentials credentials,
        DateTime expiration) =>
        new(
            _configurationRoot["JwtSettings:ValidIssuer"],
            _configurationRoot["JwtSettings:ValidAudience"],
            claims,
            expires: expiration,
            signingCredentials: credentials
        );
    
    private List<Claim> CreateClaims(AppUser user, string? role)
    {
        try
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, "TokenForTheApiWithAuth"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
            };
            
            if (role != null)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            
            return claims;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    private SigningCredentials CreateSigningCredentials()
    {
        return new SigningCredentials(
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configurationRoot["SigningKey:IssuerSigningKey"]!)
            ),
            SecurityAlgorithms.HmacSha256
        );
    }
}