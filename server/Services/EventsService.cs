using Core.Arango;
using Core.Arango.Modules;
using Core.Arango.Protocol;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System;
using Warehouse2.Models;

namespace Warehouse2.Services
{
    public class EventsService 
    {
        private readonly IArangoContext _arango;

        private readonly string _dbName;

        private readonly string _collectionName;

        public EventsService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.EventCollectionName;

        }

        // get all the docs
        public async Task<List<Event>> ListDocsAsync()
        {
            return await _arango.Query.FindAsync<Event>(_dbName, _collectionName, $"x");
        }

        public async Task<Event> GetOneAsync(string id)
        {
            return await _arango.Document.GetAsync<Event>(_dbName, _collectionName, id);
        }

        /*public async Task EventAddAsync(object newObj)
        {
            await _arango.Document.CreateAsync(_dbName, _collectionName, newObj);
        }*/
    }
}
