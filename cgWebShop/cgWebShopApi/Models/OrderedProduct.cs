namespace cgWebShopApi.Models;

public class OrderedProduct
{
    public int Id { get; set; }
    public Product Product { get; set; }
    public Order Order { get; set; }
}