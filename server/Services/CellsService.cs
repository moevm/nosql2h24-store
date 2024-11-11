using Core.Arango;
using Core.Arango.Serialization.Newtonsoft;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Extensions.Options;
using System.Data;
using Warehouse2.Models;
using static System.Net.Mime.MediaTypeNames;

namespace Warehouse2.Services
{
    public class CellsService
    {
        private readonly IArangoContext _arango;

        private readonly string _dbName;

        private readonly string _collectionName;

        private readonly string _eColName;

        private readonly string _graphName;

        private readonly string _wColName;

        private readonly ArangoNewtonsoftSerializer _serializer;

        public CellsService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.CellsCollectionName;

            _eColName = WarehouseDatabaseSettings.Value.EventCollectionName;

            _wColName = WarehouseDatabaseSettings.Value.WarehousesCollectionName;

            _graphName = WarehouseDatabaseSettings.Value.GraphCollectionName;

            _serializer = new ArangoNewtonsoftSerializer(new ArangoNewtonsoftDefaultContractResolver());
        }

        // get all the docs
        public async Task<List<Cell>> ListDocsAsync()
        {
            return await _arango.Query.FindAsync<Cell>(_dbName, _collectionName, $"x");
        }

        public async Task<Cell> GetOneAsync(string key)
        {
            return await _arango.Document.GetAsync<Cell>(_dbName, _collectionName, key);
        }

        public async Task CellAddAsync(Cell newObj)
        {
            string dscr = "new cell has just been created";
            string cellId = "CELL/" + newObj._key;
            string warehouseId = /*"WAREHOUSE/" + */newObj.warehouseId;

            //string warehouseKey = warehouseId.Substring(_wColName.Length + 1);
            //string[] list = { "1" };
            
            Event newEvent = new Event("CREATE", dscr, warehouseId, cellId);

            newObj.listOfEventIds.Add(newEvent._key);

            await _arango.Document.CreateAsync(_dbName, _collectionName, newObj);

            await _arango.Graph.Edge.CreateAsync(_dbName, _graphName, _eColName, newEvent);

            /*Console.WriteLine(await _arango.Query.ExecuteAsync<Warehouse>(_dbName,
                $"FOR w IN WAREHOUSE FILTER w RETURN w.cells"));*/
        }
    }
}
