using cgWebShopApi.Services.Role;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace cgWebShopApi.Controllers;

[ApiController]
[Route("[controller]")]
public class RoleController : ControllerBase
{
    private readonly ILogger<RoleController> _logger;
    private readonly IRoleService _roleService;
    
    public RoleController(ILogger<RoleController> logger, IRoleService roleService)
    {
        _logger = logger;
        _roleService = roleService;
    }

    [HttpPost]
    public async Task<ActionResult> ChangeRole([FromBody] string email)
    {
        try
        {
            bool result = await _roleService.ChangeUserRole(email);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }
}