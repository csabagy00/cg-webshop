namespace cgWebShopApi.DTO;

public class CategoryDto
{
    public string Name { get; set; }

    public ICollection<ProductDto> Products { get; set; } = new List<ProductDto>();
}