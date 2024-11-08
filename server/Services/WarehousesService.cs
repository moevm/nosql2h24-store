using Core.Arango;
using Microsoft.Extensions.Options;
using Warehouse2.Models;

namespace Warehouse2.Services
{
    public class WarehousesService
    {
        private readonly IArangoContext _arango;

        private readonly string _dbName;

        private readonly string _collectionName;

        public WarehousesService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.WarehousesCollectionName;

        }


        public async Task<List<Warehouse>> ListDocsAsync()
        {
            return await _arango.Query.FindAsync<Warehouse>(_dbName, _collectionName, $"x");
        }
    }
}
