namespace cgWebShopApi.DTO;

public class ProductDto
{
    public int Id { get; set; }
    public CategoryDto Category { get; set; }
    public string Name { get; set; }
    public int InStock { get; set; }
    public int Price { get; set; }
    public string? Img { get; set; }
}