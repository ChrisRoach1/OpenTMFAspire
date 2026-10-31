using System.Data;
using Npgsql;

namespace OpenTMFAspire.Data.Database;

public class DatabaseFactory : IConnectionFactory
{
    private readonly string connectionString;
    
    public DatabaseFactory(string connectionString)
    {
        this.connectionString = connectionString;
    }
    
    public async Task<IDbConnection> GetConnectionAsync()
    {
        var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync();
        return connection;
    }
}

public interface IConnectionFactory
{
    Task<IDbConnection> GetConnectionAsync();
}