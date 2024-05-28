namespace cgWebShopApi.DTO;

public class OrderDto
{
    public ICollection<ProductDto> Products { get; set; }
    public DateTime Date { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public int PostalCode { get; set; }
}