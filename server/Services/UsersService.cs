using Core.Arango;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
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

        public UsersService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.UsersCollectionName;

        }

        // get all the docs
        public async Task<List<User>> ListDocsAsync()
        {
            return await _arango.Query.FindAsync<User>(_dbName, _collectionName, $"x");
        }

        public async Task<User> GetOneAsync(string id)
        {
            return await _arango.Document.GetAsync<User>(_dbName, _collectionName, id);
        }

        public async Task UserAddAsync(User newObj)
        {
            await _arango.Document.CreateAsync(_dbName, _collectionName, newObj);
        }

        public async Task<List<User>> AuthenticateAsync(string log)
        {
             return await _arango.Query.FindAsync<User>(_dbName, _collectionName, $"x.login == {log:@}");
        }
    }
}
