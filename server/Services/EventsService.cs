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

        /* public async Task<List<Event>> GetAsync() =>
             await _arango.Document.GetManyAsync<Event>(_dbName, _collectionName, new List<string> { "28163" });   // only for one now !!!!!
        */
        public async Task<List<Event>> ListDocsAsync()
        {
            //FormattableString filter = $"x";
            return await _arango.Query.FindAsync<Event>(_dbName, _collectionName, $"x");
        }
    }
}
