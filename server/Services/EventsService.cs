﻿using Core.Arango;
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

        private readonly string _graphName;

        public EventsService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.EventCollectionName;

            _graphName = WarehouseDatabaseSettings.Value.GraphCollectionName;

        }

        // get all the docs
        public async Task<List<Event>> ListDocsAsync()
        {
            return await _arango.Query.FindAsync<Event>(_dbName, _collectionName, $"x");
        }

        public async Task<Event> GetOneAsync(string key)
        {
            return await _arango.Document.GetAsync<Event>(_dbName, _collectionName, key);
        }

        /*public async Task EventAddAsync(string CKEY, string WKEY)
        {
            string dscr = "new cell has just been created";
            string cellId = "CELL/" + CKEY;
            string warehouseId = "WAREHOUSE/" + WKEY;
            Event newEvent = new Event("CREATE", dscr, 0, warehouseId, cellId);

            await _arango.Graph.Edge.CreateAsync(_dbName, _graphName, _collectionName, newEvent);
        }*/
    }
}