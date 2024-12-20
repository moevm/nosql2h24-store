using Core.Arango;
using Core.Arango.Serialization.Newtonsoft;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Extensions.Options;
using System.Data;
using Warehouse2.Models;
using static System.Net.Mime.MediaTypeNames;

namespace Warehouse2.Services
{
    public class CellsService
    {
        private readonly IArangoContext _arango;

        private readonly string _dbName;

        private readonly string _collectionName;

        private readonly string _eColName;

        private readonly string _graphName;

        private readonly string _wColName;

        private readonly ArangoNewtonsoftSerializer _serializer;

        public CellsService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.CellsCollectionName;

            _eColName = WarehouseDatabaseSettings.Value.EventCollectionName;

            _wColName = WarehouseDatabaseSettings.Value.WarehousesCollectionName;

            _graphName = WarehouseDatabaseSettings.Value.GraphCollectionName;

            _serializer = new ArangoNewtonsoftSerializer(new ArangoNewtonsoftDefaultContractResolver());
        }

        // get all the docs
        public async Task<List<Cell>> ListDocsAsync()
        {
            return await _arango.Query.FindAsync<Cell>(_dbName, _collectionName, $"x");
        }

        public async Task<Cell> GetOneAsync(string key)
        {
            return await _arango.Document.GetAsync<Cell>(_dbName, _collectionName, key);
        }

        public async Task CellAddAsync(Cell newObj)
        {
            string dscr = "new cell has just been created";
            string cellKey = newObj._key;
            string warehouseKey = newObj.warehouseKey;

            Event newEvent = new Event("CREATE", dscr, warehouseKey, cellKey);
            newObj.listOfEventKeys.Add(newEvent._key);

            await _arango.Document.CreateAsync(_dbName, _collectionName, newObj);

            await _arango.Graph.Edge.CreateAsync(_dbName, _graphName, _eColName, newEvent);

            Warehouse warehouse = await _arango.Document.GetAsync<Warehouse>(_dbName, _wColName, warehouseKey);
            warehouse.cellsKeys.Add(newObj._key);
            await _arango.Document.UpdateAsync(_dbName, _wColName, warehouse);

        }

        public async Task<CellPage> FilterDocsAsync(CellFilterBody b)
        {
            FormattableString regFilter = $"regex_test(x._key, {b._key}, true) AND regex_test(x.warehouseKey, {b.warehouseKey}, true)";
            FormattableString filter1 = $" AND x.cellNum >= {b.startcellNum} AND x.cellNum <= {b.endcellNum} AND x.tierNum >= {b.starttierNum}";
            FormattableString filter2 = $" AND x.tierNum <= {b.endtierNum} AND x.size >= {b.startsize} AND x.size <= {b.endsize}";
            FormattableString filter3 = $" AND x.tariffPerDay >= {b.starttariffPerDay} AND x.tariffPerDay <= {b.endtariffPerDay}";
            FormattableString filter4 = $" AND x.isFree == {b.isFree} AND x.needService == {b.needService}";
            FormattableString filter5;
            
            if (b.isFree)
                filter5 = $"";
            else      
                filter5 = $" AND DATE_DIFF(x.endOfRent, {b.endendOfRent}, 's', true) > 0 AND DATE_DIFF({b.startendOfRent}, x.endOfRent, 's', true) > 0";

            List<Cell> allCells = await _arango.Query.FindAsync<Cell>(_dbName, _collectionName, $"{regFilter} {filter1} {filter2} {filter3} {filter4} {filter5}");
            foreach (Cell cell in allCells)
            {
                cell.warehouseAddress = await _arango.Query.SingleOrDefaultAsync<string>(_dbName, _wColName, $"x._key == {cell.warehouseKey}", $"x.address");
            }


            CellPage page = new CellPage();

            for (int i = b.page * 7; i < (b.page + 1) * 7; i++)
            {
                if (i < allCells.Count)
                {
                    page.cells.Add(allCells[i]);
                }
            }

            decimal d = allCells.Count / 7;
            page.count = Math.Ceiling(d);

            return page;
        }

        public async Task<Event> RentCell(CellRentBody body)
        {
            Cell cell = await _arango.Document.GetAsync<Cell>(_dbName, _collectionName, body.cellKey);
            string dscr = "user has rented the cell";

            cell.isFree = false;
            cell.endOfRent = body.endOfRent;

            Event newEvent = new Event("RENTED", dscr, cell.warehouseKey, body.cellKey, body.userKey);
            cell.listOfEventKeys.Add(newEvent._key);

            await _arango.Graph.Edge.CreateAsync(_dbName, _graphName, _eColName, newEvent);

            await _arango.Document.UpdateAsync(_dbName, _collectionName, cell);
            
            return newEvent;
        }
    }
}
