using Core.Arango;
using Core.Arango.Serialization.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading;
using Warehouse2.Models;

namespace Warehouse2.Services
{
    public class UsersService
    {
        private readonly IArangoContext _arango;

        private readonly string _dbName;

        private readonly string _collectionName;

        private readonly ArangoJsonSerializer _serializer;

        public UsersService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.UsersCollectionName;

            _serializer = new ArangoJsonSerializer(new ArangoJsonDefaultPolicy())
            {
                UseTimestamps = true // Serialize DateTime / DateTimeOffset to Unix Timestamp (in milliseconds)
            };

        }

        // get all the docs
        public async Task<List<User>> ListDocsAsync()
        {
            return await _arango.Query.FindAsync<User>(_dbName, _collectionName, $"x");
        }

        public async Task<User> GetOneAsync(string key)
        {
            return await _arango.Document.GetAsync<User>(_dbName, _collectionName, key);
        }

        public async Task UserAddAsync(User newObj)
        {
            await _arango.Document.CreateAsync(_dbName, _collectionName, newObj);
        }

        public async Task<List<string>> AuthenticateAsync(string log, string psw)
        {
            var usrs = await _arango.Query.FindAsync<string>(_dbName, _collectionName, 
                $"x.login == {log} AND x.password == {psw}", "x._key");

            return usrs;
        }

        public async Task<List<User>> FilterDocsAsync(UserFilterBody b)
        {
            FormattableString regFilter = $"regex_test(x._key, {b._key}, true) AND regex_test(x.nameSurnamePatronymic, {b.nameSurnamePatronymic}, true)";
            FormattableString filter1 = $"AND regex_test(x.role, {b.role}, true) AND regex_test(x.login, {b.login}, true) AND regex_test(x.password, {b.password}, true)";
            FormattableString filter2 = $"AND x.indebtedness >= {b.startindebtedness} AND x.indebtedness <= {b.endindebtedness}";
            return await _arango.Query.FindAsync<User>(_dbName, _collectionName, $"{regFilter} {filter1} {filter2}");
        }
    }
}
