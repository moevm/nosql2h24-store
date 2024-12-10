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
}
