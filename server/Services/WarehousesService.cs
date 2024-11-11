using Core.Arango;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
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

        // get all the docs
        public async Task<List<Warehouse>> ListDocsAsync()
        {
            return await _arango.Query.FindAsync<Warehouse>(_dbName, _collectionName, $"x");
        }

        public async Task<Warehouse> GetOneAsync(string key)
        {
            return await _arango.Document.GetAsync<Warehouse>(_dbName, _collectionName, key);
        }

        public async Task WarehouseAddAsync(Warehouse newObj)
        {
            await _arango.Document.CreateAsync(_dbName, _collectionName, newObj);
        }

    }
}
