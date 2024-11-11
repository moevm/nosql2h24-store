

namespace Warehouse2.Models
{
    public class Cell
    {
        public Cell() {}

        public Cell (int CNum, int TNum, float tariff, float size, string WId = "")
        {
            this._key = Guid.NewGuid().ToString();
            this.warehouseId = WId;
            this.cellNum = CNum;
            this.tierNum = TNum;
            this.isFree = true;
            this.needService = false;
            this.endOfRent = null;
            this.tariffPerDay = tariff;
            this.size = size;
            this.listOfEventIds = new List<string>();
        }

        public string? _key { get; set; }

        public string warehouseId { get; set; }
        
        public int cellNum { get; set; }
        
        public int tierNum { get; set; }
        
        public bool isFree { get; set; }
        
        public bool needService { get; set; }
        
        public DateTimeOffset? endOfRent { get; set; }
        
        public float tariffPerDay { get; set; }
        
        public float size { get; set; }
        
        public List<string>? listOfEventIds { get; set; }
    }
}
