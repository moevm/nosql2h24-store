﻿using Core.Arango.Serialization.Json;
using Core.Arango;
using Microsoft.Extensions.Options;
using Warehouse2.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Core.Arango.Protocol;
using System.Xml.Linq;
using Core.Arango.Serialization.Newtonsoft;

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
        private readonly ArangoNewtonsoftSerializer _serializer;

        public InitService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _uColName = WarehouseDatabaseSettings.Value.UsersCollectionName;

            _wColName = WarehouseDatabaseSettings.Value.WarehousesCollectionName;

            _cColName = WarehouseDatabaseSettings.Value.CellsCollectionName;

            _eColName = WarehouseDatabaseSettings.Value.EventCollectionName;

            _gColName = WarehouseDatabaseSettings.Value.GraphCollectionName;

            _serializer = new ArangoNewtonsoftSerializer(new ArangoNewtonsoftDefaultContractResolver());
        }

        public async Task Create()
        {
            if (!await _arango.Database.ExistAsync(_dbName))
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
                string uText = System.IO.File.ReadAllText("./test_data/users_list.json");
                var uDocument = _serializer.Deserialize<List<User>>(uText);
                await _arango.Document.CreateManyAsync<User>(_dbName, _uColName, uDocument);

                string wText = System.IO.File.ReadAllText("./test_data/warehouses_list.json");
                var wDocument = _serializer.Deserialize<List<Warehouse>>(wText);
                await _arango.Document.CreateManyAsync<Warehouse>(_dbName, _wColName, wDocument);

                string cText = System.IO.File.ReadAllText("./test_data/cells_list.json");
                var cDocument = _serializer.Deserialize<List<Cell>>(cText);
                await _arango.Document.CreateManyAsync<Cell>(_dbName, _cColName, cDocument);

                string eText = System.IO.File.ReadAllText("./test_data/events_list.json");
                var eDocument = _serializer.Deserialize<List<Event>>(eText);
                await _arango.Document.CreateManyAsync<Event>(_dbName, _eColName, eDocument);
            }
        }
    }
}
