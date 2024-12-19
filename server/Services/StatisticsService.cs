using Core.Arango.Serialization.Newtonsoft;
using Core.Arango;
using Microsoft.Extensions.Options;
using Warehouse2.Models;

namespace Warehouse2.Services
{
    public class StatisticsService
    {
        private readonly IArangoContext _arango;

        private readonly string _dbName;

        private readonly string _wColName;

        private readonly string _eColName;

        // private readonly ArangoNewtonsoftSerializer _serializer;

        public StatisticsService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _wColName = WarehouseDatabaseSettings.Value.WarehousesCollectionName;

            _eColName = WarehouseDatabaseSettings.Value.EventCollectionName;

            //_serializer = new ArangoNewtonsoftSerializer(new ArangoNewtonsoftDefaultContractResolver());
        }


        public async Task<List<WarehouseCellsCount>> CountCellsWarehouses()
        {
            FormattableString res = $"{{ _key: x._key, address : x.address, count : LENGTH(x.cellsKeys) }}";

            return await _arango.Query.FindAsync<WarehouseCellsCount>(_dbName, _wColName, $"x", $"{res}");
        }
    }
}
