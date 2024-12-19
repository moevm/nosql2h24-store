namespace Warehouse2.Models
{
    public class Warehouse
    {
        public Warehouse() 
        { }

        public Warehouse(string nAddress, int nCapacity, string nChiefKey)
        {
            this._key = Guid.NewGuid().ToString();
            this.address = nAddress;
            this.capacity = nCapacity;
            this.chiefKey = nChiefKey;
            this.cellsKeys = new List<string>();
        }

        public string? _key { get; set; }

        public string? address { get; set; }

        public int capacity { get; set; }

        public string? chiefKey { get; set; }

        public List<string>? cellsKeys { get; set; }
    }

    public class WarehouseFilterBody
    {
        public WarehouseFilterBody()
        {
            this._key = "";
            this.chiefKey = "";
            this.address = "";
            this.startcapacity = 0;
            this.endcapacity = 1000000;
        }

        public string? _key { get; set; }

        public string? address { get; set; }

        public int startcapacity { get; set; }
        public int endcapacity { get; set; }

        public string? chiefKey { get; set; }
    }

    public class WarehouseCellsCount
    {
        public WarehouseCellsCount()
        {
            this._key = "";
            this.address = "";
            this.count = 0;
        }

        public string? _key { get; set; }

        public string? address { get; set; }

        public int count { get; set; }
    }
}
