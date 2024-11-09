﻿using Core.Arango;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Extensions.Options;
using System.Data;
using Warehouse2.Models;

namespace Warehouse2.Services
{
    public class CellsService
    {
        private readonly IArangoContext _arango;

        private readonly string _dbName;

        private readonly string _collectionName;

        private readonly string _eColName;

        private readonly string _graphName;

        public CellsService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.CellsCollectionName;

            _eColName = WarehouseDatabaseSettings.Value.EventCollectionName;

            _graphName = WarehouseDatabaseSettings.Value.GraphCollectionName;
        }

        // get all the docs
        public async Task<List<Cell>> ListDocsAsync()
        {
            return await _arango.Query.FindAsync<Cell>(_dbName, _collectionName, $"x");
        }

        public async Task<Cell> GetOneAsync(string id)
        {
            return await _arango.Document.GetAsync<Cell>(_dbName, _collectionName, id);
        }

        public async Task CellAddAsync(Cell newObj)
        {
            await _arango.Document.CreateAsync(_dbName, _collectionName, newObj);

            
            string dscr = "new cell has just been created";
            string cellId = "CELL/" + newObj.Key;
            string warehouseId = "WAREHOUSE/" + newObj.warehouseId;
            Event newEvent = new Event("CREATE", dscr, 0, warehouseId, cellId);

            await _arango.Graph.Edge.CreateAsync(_dbName, _graphName, _eColName, newEvent);
        }
    }
}
