using System;
using Npgsql;

namespace DBInitializer;

public static class DatabaseInitializer
{
    private static readonly string connectionString =
        "Server=localhost;Port=5432;User Id=postgres;Password=postgres;Database=cgwebshop";

    public static void InitializeDatabase()
    {
        try
        {
            using (var connection = new NpgsqlConnection(connectionString))
            {
                connection.Open();
                
                CreateDatabase();
                
                CreateProducts(connection);
                CreateUsers(connection);
                CreateOrders(connection);
                CreateCategories(connection);
                
                InsertProducts(connection);
                InsertUsers(connection);
                InsertOrders(connection);
                InsertCategories(connection);
            }

            Console.WriteLine("Database initialized");
        }
        catch (Exception e)
        {
            Console.WriteLine("Error initializing:" + e.Message);
        }
    }
    
    private static void CreateDatabase()
    {
        try
        {
            string connectionString = "Server=localhost;Port=5432;User Id=postgres;Password=postgres";

            using (var connection = new NpgsqlConnection(connectionString))
            {
                connection.Open();
            
                string createDatabase = "CREATE DATABASE cgwebshop";

                using (var command = new NpgsqlCommand(createDatabase, connection))
                {
                    command.ExecuteNonQuery();
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("Error creating:" + e.Message);
        }
    }
    
    

    private static void CreateProducts(NpgsqlConnection connection)
    {
        string create = "CREATE TABLE products (" +
                        "product_id SERIAL PRIMARY KEY," +
                        "category_id INT NOT NULL," +
                        "product_name VARCHAR(20) NOT NULL ," +
                        "in_stock INT NOT NULL," +
                        "price INT NOT NULL ," +
                        "img TEXT)";

        ExecuteSqlCommand(create, connection);
    }
    
    private static void CreateUsers(NpgsqlConnection connection)
    {
        string create = "CREATE TABLE users (" +
                        "user_id SERIAL PRIMARY KEY," +
                        "first_name VARCHAR(40) NOT NULL," +
                        "middle_name VARCHAR(40)," +
                        "last_name VARCHAR(40) NOT NULL," +
                        "email VARCHAR(30) NOT NULL,"+
                        "password VARCHAR(60) NOT NULL,"+
                        "phone VARCHAR(12) NOT NULL," +
                        "registration_date DATE NOT NULL," +
                        "admin INT NOT NULL DEFAULT 0)";

        ExecuteSqlCommand(create, connection);
    }

    private static void CreateOrders(NpgsqlConnection connection)
    {
        string create = "CREATE TABLE orders (" +
                        "order_id SERIAL PRIMARY KEY," +
                        "product_id INT NOT NULL," +
                        "user_id INT NOT NULL," +
                        "order_date DATE NOT NULL," +
                        "ship_address VARCHAR(50)," +
                        "ship_city VARCHAR(50)," +
                        "ship_country VARCHAR(15)," +
                        "ship_postalcode VARCHAR(10))";
        
        ExecuteSqlCommand(create, connection);
    }

    private static void CreateCategories(NpgsqlConnection connection)
    {
        string create = "CREATE TABLE categories (" +
                        "category_id SERIAL PRIMARY KEY," +
                        "category_name VARCHAR(20))";
        
        ExecuteSqlCommand(create, connection);
    }

    private static void InsertProducts(NpgsqlConnection connection)
    {
        string insert = "INSERT INTO products (category_id, product_name, in_stock, price, img) VALUES " +
                        "(1, 'Laptop', 10, 800, null)," +
                        "(1, 'Smartphone', 20, 600, null)," +
                        "(1, 'Tablet', 15, 400, null)," +
                        "(1, 'Headphones', 25, 100, null)," +
                        "(1, 'Monitor', 10, 300, null)," +
                        "(1, 'Keyboard', 15, 50, null)," +
                        "(2, 'Lawn Mower', 5, 300, null)," +
                        "(2, 'Garden Hose', 15, 50, null)," +
                        "(2, 'Garden Tools Set', 10, 80, null)," +
                        "(2, 'Plant Pots', 30, 20, null)," +
                        "(2, 'Outdoor Lighting', 20, 150, null)," +
                        "(3, 'Vacuum Cleaner', 8, 200, null)," +
                        "(3, 'Sofa', 12, 600, null)," +
                        "(3, 'Dining Table', 10, 400, null)," +
                        "(3, 'Bed Frame', 7, 300, null)," +
                        "(3, 'Wardrobe', 5, 250, null)";
        
        ExecuteSqlCommand(insert, connection);
    }

    private static void InsertUsers(NpgsqlConnection connection)
    {
        string now = DateTime.Now.ToString("yyyy-MM-dd");
        
        string insert =
            "INSERT INTO users (first_name, middle_name, last_name, email, password, phone, registration_date, admin) VALUES " +
            "('John', null, 'Bull', 'john@example.com', 'password1','123456789', '"+ now +"', 0)," +
            "('Steven', 'Mark', 'Thomson', 'steven@example.com', 'password2','987654321', '"+ now +"', 0)," +
            "('Alice', null, 'Smith', 'alice@example.com', 'password3','555555555', '"+ now +"', 0)," +
            "('Bob', null, 'Johnson', 'bob@example.com', 'password4','666666666', '"+ now +"', 0)," +
            "('Admin', null, 'Admin', 'admin@example.com', 'password5','777777777', '"+ now +"', 1)";
        
        ExecuteSqlCommand(insert, connection);
    }

    private static void InsertOrders(NpgsqlConnection connection)
    {
        string now = DateTime.Now.ToString("yyyy-MM-dd");
        
        string insert = "INSERT INTO orders (product_id, user_id, order_date, ship_address, ship_city, ship_country, ship_postalcode) VALUES" +
                        "(1, 2, '"+ now +"', 'Example street 2', 'Budapest', 'Hungary', '1772')," +
                        "(2, 1, '"+ now +"', 'Example street 15', 'Szeged', 'Hungary', '2225')";
        
        ExecuteSqlCommand(insert, connection);
    }

    private static void InsertCategories(NpgsqlConnection connection)
    {
        string insert = "INSERT INTO categories (category_name) VALUES " +
                        "('Tech')," +
                        "('Garden')," +
                        "('Home')";
        
        ExecuteSqlCommand(insert, connection);
    }
    
    private static void ExecuteSqlCommand(string sqlCommand, NpgsqlConnection connection)
    {
        using (var command = new NpgsqlCommand(sqlCommand, connection))
        {
            command.ExecuteNonQuery();
        }
    }
}