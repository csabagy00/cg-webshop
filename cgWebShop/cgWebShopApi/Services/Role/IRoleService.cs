namespace cgWebShopApi.Services.Role;

public interface IRoleService
{
    Task<bool> ChangeUserRole(string email);
}