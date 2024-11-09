

namespace Warehouse2.Models
{
    public class Cell
    {
        public Cell() {}

        public Cell (int CNum, int TNum, float tariff, float size, string WId = "")
        {
            this.Key = Guid.NewGuid().ToString();
            this.warehouseId = WId;
            this.cellNum = CNum;
            this.tierNum = TNum;
            this.isFree = true;
            this.endOfRent = 0;
            this.tariffPerDay = tariff;
            this.size = size;
            this.listOfEventIds = [];
        }

        public string? Key { get; set; }

        public string? warehouseId { get; set; }
        
        public int cellNum { get; set; }
        
        public int tierNum { get; set; }
        
        public bool isFree { get; set; }
        
        public int endOfRent { get; set; }
        
        public float tariffPerDay { get; set; }
        
        public float size { get; set; }
        
        public string[]? listOfEventIds { get; set; }
    }
}
