using Core.Arango.Serialization.Json;
using Core.Arango;
using Microsoft.Extensions.Options;
using Warehouse2.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Core.Arango.Protocol;

namespace Warehouse2.Services
{
    public class InitService
    {
        private readonly IArangoContext _arango;

        private readonly string _dbName;

        private readonly string _uColName;
        private readonly string _wColName;
        private readonly string _cColName;
        private readonly string _eColName;
        private readonly string _gColName;

        public InitService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _uColName = WarehouseDatabaseSettings.Value.UsersCollectionName;

            _wColName = WarehouseDatabaseSettings.Value.WarehousesCollectionName;

            _cColName = WarehouseDatabaseSettings.Value.CellsCollectionName;

            _eColName = WarehouseDatabaseSettings.Value.EventCollectionName;

            _gColName = WarehouseDatabaseSettings.Value.GraphCollectionName;

        }

        public async Task Create()
        {
            await _arango.Database.CreateAsync(_dbName);
            await _arango.Collection.CreateAsync(_dbName, _wColName, ArangoCollectionType.Document);
            await _arango.Collection.CreateAsync(_dbName, _uColName, ArangoCollectionType.Document);
            await _arango.Collection.CreateAsync(_dbName, _cColName, ArangoCollectionType.Document);
            await _arango.Collection.CreateAsync(_dbName, _eColName, ArangoCollectionType.Edge);

            await _arango.Graph.CreateAsync(_dbName, new ArangoGraph
            {
                Name = "storeGraph",
                EdgeDefinitions = new List<ArangoEdgeDefinition>
                {
                    new()
                    {
                      Collection = _eColName,
                      From = new List<string> { _cColName, _uColName, _wColName },
                      To = new List<string> { _cColName, _uColName }
                    }
                }
            });
        }

        public async Task Initialize()
        {

        }
    }
}
