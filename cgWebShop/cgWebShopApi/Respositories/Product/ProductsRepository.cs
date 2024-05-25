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
        
    
    public async Task<List<Product>> GetAllProducts()
    {
        await _connection.OpenAsync();
        var adapter = new NpgsqlDataAdapter("SELECT * FROM products", _connection);

        var dataSet = new DataSet();
        await Task.Run(() => adapter.Fill(dataSet));
        
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

        await _connection.CloseAsync();
        
        return queryResult;
    }


    public async Task<Product> GetProductById(int id)
    {
        await _connection.OpenAsync();
        var adapter = new NpgsqlDataAdapter($"SELECT * FROM products WHERE product_id = {id}", _connection);

        var dataSet = new DataSet();
        await Task.Run(() => adapter.Fill(dataSet));

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
        
        await _connection.CloseAsync();

        return product;
    }

    public async Task AddNewProduct(Product product)
    {
        await _connection.OpenAsync();

        string query = $"INSERT INTO products (category_id, product_name, in_stock, price, img) VALUES" +
                       $"(@CategoryId, @ProductName, @InStock, @Price, @Img)";
        
        await using (NpgsqlCommand command = new NpgsqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@CategoryId", Array.IndexOf(Enum.GetValues(typeof(Category)), product.Category));
            command.Parameters.AddWithValue("@ProductName", product.Name);
            command.Parameters.AddWithValue("@InStock", product.InStock);
            command.Parameters.AddWithValue("@Price", product.Price);
            command.Parameters.AddWithValue("@Img", string.IsNullOrEmpty(product.Img) ? DBNull.Value : product.Img);
            
            await command.ExecuteNonQueryAsync();
        }

        await _connection.CloseAsync();
    }

    public async Task DeleteOneProduct(int id)
    {
        await _connection.OpenAsync();

        string query = $"DELETE FROM products WHERE product_id = @Id";

        await using (NpgsqlCommand command = new NpgsqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@Id", id);

            await command.ExecuteNonQueryAsync();
        }

        await _connection.CloseAsync();
    }

    public async Task UpdateProductById(int id, Product product)
    {
        await _connection.OpenAsync();

        string query = $"UPDATE products SET category_id = @CategoryId, product_name = @Name, in_stock = @InStock, " +
                       $"price = @Price, img = @Img WHERE product_id = @ProductId";

        await using (NpgsqlCommand command = new NpgsqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@CategoryId", Array.IndexOf(Enum.GetValues(typeof(Category)), product.Category));
            command.Parameters.AddWithValue("@Name", product.Name);
            command.Parameters.AddWithValue("@InStock", product.InStock);
            command.Parameters.AddWithValue("@Price", product.Price);
            command.Parameters.AddWithValue("@Img", string.IsNullOrEmpty(product.Img) ? DBNull.Value : product.Img);
            command.Parameters.AddWithValue("@ProductId", id);

            await command.ExecuteNonQueryAsync();
        }

        await _connection.CloseAsync();
    }
    
}