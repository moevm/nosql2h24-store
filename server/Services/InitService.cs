using Core.Arango.Serialization.Json;
using Core.Arango;
using Microsoft.Extensions.Options;
using Warehouse2.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Core.Arango.Protocol;
using System.Xml.Linq;
using Core.Arango.Serialization.Newtonsoft;
using System.Reflection.Metadata;

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

        public async Task Import(Data data)
        {
            try
            {   
                if (data != null){
                    List<string> cDocs = await _arango.Query.FindAsync<string>(_dbName, _cColName, $"x", $"x._key");
                    List<string> uDocs = await _arango.Query.FindAsync<string>(_dbName, _uColName, $"x", $"x._key");
                    List<string> eDocs = await _arango.Query.FindAsync<string>(_dbName, _eColName, $"x", $"x._key");
                    List<string> wDocs = await _arango.Query.FindAsync<string>(_dbName, _wColName, $"x", $"x._key");

                    foreach (var key in  cDocs)
                        await _arango.Document.DeleteAsync<Cell>(_dbName, _cColName, key);
                    foreach (var key in uDocs)
                        await _arango.Document.DeleteAsync<User>(_dbName, _uColName, key);
                    foreach (var key in eDocs)
                        await _arango.Document.DeleteAsync<Event>(_dbName, _eColName, key);
                    foreach (var key in wDocs)
                        await _arango.Document.DeleteAsync<Warehouse>(_dbName, _wColName, key);


                    await _arango.Document.CreateManyAsync<User>(_dbName, _uColName, data.users);
                    await _arango.Document.CreateManyAsync<Warehouse>(_dbName, _wColName, data.warehouses);
                    await _arango.Document.CreateManyAsync<Cell>(_dbName, _cColName, data.cells);
                    await _arango.Document.CreateManyAsync<Event>(_dbName, _eColName, data.events);
                }
            }
            catch {
                Console.WriteLine("Huston, we have some troubles!");
            }
        }

        public async Task<Data> ExportData()
        {   
            Data data = new Data();
            data.users = await _arango.Query.FindAsync<User>(_dbName, _uColName, $"x");
            data.cells = await _arango.Query.FindAsync<Cell>(_dbName, _cColName, $"x");
            data.events = await _arango.Query.FindAsync<Event>(_dbName, _eColName, $"x");
            data.warehouses = await _arango.Query.FindAsync<Warehouse>(_dbName, _wColName, $"x");

            return data;
        }
    }
}
