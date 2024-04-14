using System.Data;
using cgWebShopApi.Models;
using Npgsql;

namespace cgWebShopApi.Respositories;

public class ProductsRepository : IProductsRepository
{
    private NpgsqlConnection _connection;
    private Category[] _categories;

    public ProductsRepository(NpgsqlConnection connection)
    {
        _connection = connection;
        _categories = (Category[])Enum.GetValues(typeof(Category));
    }
        
    
    public List<Product> GetAllProducts()
    {
        _connection.Open();
        var adapter = new NpgsqlDataAdapter("SELECT * FROM products", _connection);

        var dataSet = new DataSet();
        adapter.Fill(dataSet);
        
        var table = dataSet.Tables[0];

        var queryResult = new List<Product>();

        foreach (DataRow row in table.Rows)
        {
            Console.WriteLine((int)row["product_id"]);

            var product = new Product
            {
                Id = (int)row["product_id"],
                Name = (string)row["product_name"],
                Category = _categories[(int)row["category_id"] - 1],
                InStock = (int)row["in_stock"],
                Price = (int)row["price"],
                Img = row["img"] is System.DBNull ? null : (string)row["img"]
            };
            
            queryResult.Add(product);
        }

        _connection.Close();
        
        return queryResult;
    }


    public Product GetProductById(int id)
    {
        _connection.Open();
        var adapter = new NpgsqlDataAdapter($"SELECT * FROM products WHERE product_id = {id}", _connection);

        var dataSet = new DataSet();
        adapter.Fill(dataSet);

        var table = dataSet.Tables[0];

        var row = table.Rows[0];

        var product = new Product
        {
            Id = (int)row["product_id"],
            Name = (string)row["product_name"],
            Category = _categories[(int)row["category_id"] - 1],
            InStock = (int)row["in_stock"],
            Price = (int)row["price"],
            Img = row["img"] is System.DBNull ? null : (string)row["img"]
        };
        
        _connection.Close();

        return product;
    }
}