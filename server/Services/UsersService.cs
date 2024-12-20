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

        public async Task<AuthData> AuthenticateAsync(PassData data)
        {
            FormattableString filter = $"x.login == {data.email} AND x.password == {data.password}";
            FormattableString res = $"{{ _key: x._key, nameSurnamePatronymic : x.nameSurnamePatronymic, role : x.role }}";

            AuthData user = await _arango.Query.SingleOrDefaultAsync<AuthData>(_dbName, _collectionName, $"{filter}", $"{res}");

            return user;
        }

        public async Task<UserPage> FilterDocsAsync(UserFilterBody b)
        {
            FormattableString regFilter = $"regex_test(x._key, {b._key}, true) AND regex_test(x.nameSurnamePatronymic, {b.nameSurnamePatronymic}, true)";
            FormattableString filter1 = $" AND regex_test(x.role, {b.role}, true) AND regex_test(x.login, {b.login}, true) AND regex_test(x.password, {b.password}, true)";
            FormattableString filter2 = $" AND x.indebtedness >= {b.startindebtedness} AND x.indebtedness <= {b.endindebtedness}";
            FormattableString filter3 = $" AND DATE_DIFF(x.regDate, {b.endregDate}, 's', true) > 0 AND DATE_DIFF({b.startregDate}, x.regDate, 's', true) > 0";
            FormattableString filter4 = $" AND DATE_DIFF(x.editDate, {b.endeditDate}, 's', true) > 0 AND DATE_DIFF({b.starteditDate}, x.editDate, 's', true) > 0";
            FormattableString filter5 = $" AND DATE_DIFF(x.birthday, {b.endbirthday}, 'd', true) > 0 AND DATE_DIFF({b.startbirthday}, x.birthday, 'd', true) > 0";

            List<User> allUsers = await _arango.Query.FindAsync<User>(_dbName, _collectionName, $"{regFilter} {filter1} {filter2} {filter3} {filter4} {filter5}");

            UserPage page = new UserPage();

            for (int i = b.page * 7; i < (b.page + 1) * 7; i++)
            {
                if (i < allUsers.Count)
                {
                    page.users.Add(allUsers[i]);
                }
            }

            decimal d = allUsers.Count / 7.0;
            page.count = Math.Ceiling(d);

            return page;
        }

        public async Task<List<string>> ListDirectorsKeysAsync()
        {
            return await _arango.Query.FindAsync<string>(_dbName, _collectionName, $"x.role == 'director'", $"x._key");
        }
    }
}
