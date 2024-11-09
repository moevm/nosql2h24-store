using Core.Arango;
using Microsoft.Extensions.Options;
using Warehouse2.Models;

namespace Warehouse2.Services
{
    public class UsersService
    {
        private readonly IArangoContext _arango;

        private readonly string _dbName;

        private readonly string _collectionName;

        public UsersService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.UsersCollectionName;

        }


        public async Task<List<User>> ListDocsAsync()
        {
            return await _arango.Query.FindAsync<User>(_dbName, _collectionName, $"x");
        }
    }
}
