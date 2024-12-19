using Core.Arango.Serialization.Newtonsoft;
using Core.Arango;
using Microsoft.Extensions.Options;
using Warehouse2.Models;
using System;

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

        /*Используемость складов за период (количество событий rented суммарное по всем ячейкам, для каждого склада)
        Statistics/EventWarehouse { start: date1, end: date2}
            count,
            _key
            address*/
        public async Task<List<WarehouseCellsCount>> CountRentCells(Period period)
        {
            List<Warehouse> warehouses = await _arango.Query.FindAsync<Warehouse>(_dbName, _wColName, $"LENGTH(x.cellsKeys) != 0");
            List<WarehouseCellsCount> res = new List<WarehouseCellsCount>();

            foreach (Warehouse w in warehouses)
            {
                string wID = "WAREHOUSE/" + w._key;
                FormattableString filter1 = $"DATE_DIFF(x.dateAndTime, {period.end}, 's', true) > 0 AND DATE_DIFF({period.start}, x.dateAndTime, 's', true) > 0";
                FormattableString filter2 = $"AND x.action == 'RENTED' AND x._from == {wID}";

                List<Event> events = await _arango.Query.FindAsync<Event>(_dbName, _eColName, $"{filter1} {filter2}");

                if ( events.Count != 0) 
                    res.Add(new WarehouseCellsCount(w._key, w.address, events.Count));
            }

            return res;
        }
    }
}
