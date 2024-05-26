using System.ComponentModel.DataAnnotations;

namespace cgWebShopApi.Contracts;

public record RegistrationReq(
    [Required]string Email,
    [Required]string Username,
    [Required]string Password,
    [Required]string First,
    string? Middle,
    [Required]string Last,
    [Required]string Phone);