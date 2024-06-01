namespace cgWebShopApi.Models;

public class Order
{
    public int Id { get; set; }
    public ICollection<OrderedProduct> Products { get; set; }
    public AppUser AppUser { get; set; }
    public DateTime Date { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public int PostalCode { get; set; }
}