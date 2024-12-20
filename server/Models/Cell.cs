

using Microsoft.AspNetCore.Http;

namespace Warehouse2.Models
{
    public class Cell
    {
        public Cell() {}

        public Cell (int CNum, int TNum, float tariff, float size, string WKey = "")
        {
            this._key = Guid.NewGuid().ToString();
            this.warehouseKey = WKey;
            this.warehouseAddress = "";
            this.cellNum = CNum;
            this.tierNum = TNum;
            this.isFree = true;
            this.needService = false;
            this.endOfRent = null;
            this.tariffPerDay = tariff;
            this.size = size;
            this.listOfEventKeys = new List<string>();
        }

        public string? _key { get; set; }

        public string warehouseKey { get; set; }

        public string warehouseAddress { get; set; }

        public int cellNum { get; set; }
        
        public int tierNum { get; set; }
        
        public bool isFree { get; set; }
        
        public bool needService { get; set; }
        
        public DateTimeOffset? endOfRent { get; set; }
        
        public float tariffPerDay { get; set; }
        
        public float size { get; set; }
        
        public List<string>? listOfEventKeys { get; set; }
    }

    public class CellFilterBody
    {
        public CellFilterBody()
        {
            this._key = "";
            this.warehouseKey = "";

            this.startcellNum = 0;
            this.endcellNum = 21; // => < 20
            
            this.starttierNum = 0;
            this.endtierNum = 6;  // => < 6

            this.isFree = true;
            this.needService = false;
            
            this.startsize = 0;
            this.endsize = 2.1f;   // => < 2.1

            this.starttariffPerDay = 0;
            this.endtariffPerDay = 5001;     // => < 5001

            this.startendOfRent = DateTimeOffset.Parse("1900-01-01 00:00:00-03:00");
            this.endendOfRent = DateTimeOffset.Parse("2050-12-12 00:00:00-03:00");
        }

        public string _key { get; set; }

        public string warehouseKey { get; set; }

        public int startcellNum { get; set; }
        public int endcellNum { get; set; }

        public int starttierNum { get; set; }
        public int endtierNum { get; set; }

        public bool isFree { get; set; }

        public bool needService { get; set; }

        public DateTimeOffset? startendOfRent { get; set; }
        public DateTimeOffset? endendOfRent { get; set; }

        public float starttariffPerDay { get; set; }
        public float endtariffPerDay { get; set; }

        public float startsize { get; set; }
        public float endsize { get; set; }

    }

    public class CellRentBody
    {
        public CellRentBody()
        {
            this.cellKey = "";
            this.userKey = "";

            this.endOfRent = DateTimeOffset.Parse("2050-12-12 00:00:00-03:00");
        }

        public string cellKey { get; set; }

        public string userKey { get; set; }

        public DateTimeOffset? endOfRent { get; set; }

    }

    public class EventCell
    {
        public EventCell(string key = "", int CNum = 0, int c = 0)
        {
            this._key = key;
            this.cellNum = CNum;
            this.count = c;
        }

        public string? _key { get; set; }

        public int? cellNum { get; set; }

        public int count { get; set; }
    }

    public class RentedCells
    {
        public RentedCells()
        {
            this.count = 0;
            this.cells = new List<Cell>();
        }

        public List<Cell> cells { get; set; }

        public decimal count { get; set; }
    }

    public class MyCellsBody
    {
        public MyCellsBody() { }
        
        public string userKey { get; set; }

        public int page { get; set; }

        public int startcellNum { get; set; }
        public int endcellNum { get; set; }

        public int starttierNum { get; set; }
        public int endtierNum { get; set; }

        public bool isFree { get; set; }

        public bool needService { get; set; }

        public DateTimeOffset? startendOfRent { get; set; }
        public DateTimeOffset? endendOfRent { get; set; }

        public float starttariffPerDay { get; set; }
        public float endtariffPerDay { get; set; }

        public float startsize { get; set; }
        public float endsize { get; set; }

    }
}
