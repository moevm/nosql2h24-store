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

        private readonly string _graphName;

        private readonly string _cColName;

        public EventsService(IOptions<WarehouseDatabaseSettings> WarehouseDatabaseSettings)
        {
            _arango = new ArangoContext(WarehouseDatabaseSettings.Value.ConnectionString);

            _dbName = WarehouseDatabaseSettings.Value.DatabaseName;

            _collectionName = WarehouseDatabaseSettings.Value.EventCollectionName;

            _cColName = WarehouseDatabaseSettings.Value.CellsCollectionName;

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

        public async Task<EventPage> FilterDocsAsync(EventFilterBody b)
        {
            FormattableString regFilter = $"regex_test(x._key, {b._key}, true) AND regex_test(x.cellKey, {b.cellKey}, true)";
            FormattableString filter1 = $" AND regex_test(x.userKey, {b.userKey}, true) AND regex_test(x.action, {b.action}, true)";
            FormattableString filter2 = $" AND regex_test(x.description, {b.description}, true)";
            FormattableString filter3 = $" AND DATE_DIFF(x.dateAndTime, {b.enddateAndTime}, 'f', true) > 0 AND DATE_DIFF({b.startdateAndTime}, x.dateAndTime, 'f', true) > 0";

            List<Event> allEvents = await _arango.Query.FindAsync<Event>(_dbName, _collectionName, $"{regFilter} {filter1} {filter2} {filter3}");
            EventPage page = new EventPage();

            for (int i = b.page * 7; i < (b.page + 1) * 7; i++)
            {
                if (i < allEvents.Count)
                {
                    page.events.Add(allEvents[i]);
                }
            }

            double d = allEvents.Count / 7.0f;
            page.count = ((int)Math.Ceiling(d));

            return page;
        }

        public async Task<RentedCells> GetRentedCells(MyCellsBody body)
        {
            FormattableString filter = $"x.action == 'RENTED' AND regex_test(x.userKey, {body.userKey}, true)";
            FormattableString filter1 = $" AND x.cellNum >= {body.startcellNum} AND x.cellNum <= {body.endcellNum} AND x.tierNum >= {body.starttierNum}";
            FormattableString filter2 = $" AND x.tierNum <= {body.endtierNum} AND x.size >= {body.startsize} AND x.size <= {body.endsize}";
            FormattableString filter3 = $" AND x.tariffPerDay >= {body.starttariffPerDay} AND x.tariffPerDay <= {body.endtariffPerDay}";
            FormattableString filter4 = $" AND x.isFree == false AND x.needService == {body.needService}";

            List<Event> events = await _arango.Query.FindAsync<Event>(_dbName, _collectionName, $"{filter}");
            List<Cell> cells = new List<Cell>();
            RentedCells rentedCells = new RentedCells();

            foreach (Event e in events)
            {
                Cell cell = await _arango.Query.SingleOrDefaultAsync<Cell>(_dbName, _cColName, $"x._key == {e.cellKey} {filter1} {filter2} {filter3} {filter4}");
                if (cell.listOfEventKeys.Last() == e._key)
                    cells.Add(cell);
            }

            for (int i = body.page * 7; i < (body.page + 1) * 7; i++)
            {
                if (i < cells.Count)
                {
                    rentedCells.cells.Add( cells[i] );
                }
            }

            double d = cells.Count / 7.0f;
            rentedCells.count = ((int)Math.Ceiling(d));

            return rentedCells;
        }
    }
}
