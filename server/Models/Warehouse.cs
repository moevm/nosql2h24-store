namespace Warehouse2.Models
{
    public class Warehouse
    {
        public Warehouse() 
        { }

        public Warehouse(string nAddress, int nCapacity, string nChiefId = "")
        {
            this.Key = Guid.NewGuid().ToString();
            this.address = nAddress;
            this.capacity = nCapacity;
            this.chiefId = nChiefId;
            this.cells = [];
        }

        public string? Key { get; set; }

        public string? address { get; set; }

        public int capacity { get; set; }

        public string? chiefId { get; set; }

        public string[]? cells { get; set; }
    }
}
