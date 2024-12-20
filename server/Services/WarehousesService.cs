using Core.Arango;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using Warehouse2.Models;
using Core.Arango.Serialization.Newtonsoft;

namespace Warehouse2.Services
{
    public class WarehousesService
    {
        private readonly IArangoContext _arango;

        private readonly string _dbName;

        private readonly string _collectionName;

        private readonly ArangoNewtonsoftSerializer _serializer;

        public WarehousesService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.WarehousesCollectionName;

            _serializer = new ArangoNewtonsoftSerializer(new ArangoNewtonsoftDefaultContractResolver());
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

        public async Task<WarehousePage> FilterDocsAsync(WarehouseFilterBody b)
        {
            FormattableString regFilter = $"regex_test(x._key, {b._key}, true) AND regex_test(x.address, {b.address}, true)";
            FormattableString filter1 = $"AND regex_test(x.chiefKey, {b.chiefKey}, true) AND x.capacity >= {b.startcapacity}";
            FormattableString filter2 = $"AND x.capacity <= {b.endcapacity}";

            List<Warehouse> allWarehouses = await _arango.Query.FindAsync<Warehouse>(_dbName, _collectionName, $"{regFilter} {filter1} {filter2}");

            WarehousePage page = new WarehousePage();

            for (int i = b.page * 7; i < (b.page + 1) * 7; i++)
            {
                if (i < allWarehouses.Count)
                {
                    page.warehouses.Add(allWarehouses[i]);
                }
            }

            double d = allWarehouses.Count / 7.0f;
            page.count = ((int)Math.Ceiling(d));

            return page;
        }

        public async Task<List<string>> ListKeysAsync()
        {
            return await _arango.Query.FindAsync<string>(_dbName, _collectionName, $"x", $"x._key");
        }
    }
}
