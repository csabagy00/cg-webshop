using cgWebShopApi.DTO;
using cgWebShopApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace cgWebShopApi.Controllers;

[ApiController]
[Route("[controller]"), Authorize(Roles = "Admin, User")]
public class AppUserController : ControllerBase
{
    private readonly ILogger<AppUserController> _logger;
    private readonly UserManager<AppUser> _userManager;

    public AppUserController(UserManager<AppUser> userManager, ILogger<AppUserController> logger)
    {
        _userManager = userManager;
        _logger = logger;
    }

    [HttpPatch]
    public async Task<ActionResult> UpdateUserInfo([FromBody]UserUpdateDto userUpdateDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(userUpdateDto.Id);

            if (user == null)
            {
                return NotFound("User not found");
            }

            user.Email = string.IsNullOrEmpty(userUpdateDto.Email) ? user.Email : userUpdateDto.Email;
            user.FirstName = string.IsNullOrEmpty(userUpdateDto.First) ? user.FirstName : userUpdateDto.First;
            user.MiddleName = string.IsNullOrEmpty(userUpdateDto.Middle) ? user.MiddleName : userUpdateDto.Middle;
            user.LastName = string.IsNullOrEmpty(userUpdateDto.Last) ? user.LastName : userUpdateDto.Last;
            user.UserName = string.IsNullOrEmpty(userUpdateDto.Username) ? user.UserName : userUpdateDto.Username;
            user.Phone = string.IsNullOrEmpty(userUpdateDto.Phone) ? user.Phone : userUpdateDto.Phone;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest();
            }

            return Ok("User updated");
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            throw;
        }
    }
}