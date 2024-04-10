using Npgsql;

namespace DBInitializer;

class Program
{
    static void Main(string[] args)
    {
        DatabaseInitializer.InitializeDatabase();
    }
}