using Core.Arango;
using Microsoft.Extensions.Options;
using Warehouse2.Models;

namespace Warehouse2.Services
{
    public class CellsService
    {
        private readonly IArangoContext _arango;

        private readonly string _dbName;

        private readonly string _collectionName;

        public CellsService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.CellsCollectionName;

        }

        
        public async Task<List<Cell>> ListDocsAsync()
        {
            return await _arango.Query.FindAsync<Cell>(_dbName, _collectionName, $"x");
        }
    }
}
