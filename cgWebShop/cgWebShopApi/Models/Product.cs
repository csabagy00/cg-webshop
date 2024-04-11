namespace cgWebShopApi.Models;

public class Product
{
    public int Id { get; set; }
    
    public Category Category { get; set; }
    
    public string Name { get; set; }
    
    public int InStock { get; set; }
    
    public int Price { get; set; }
    
    public string? Img { get; set; }
}