

namespace Warehouse2.Models
{
    public class Cell
    {
        public Cell() {}

        public string? Id { get; set; }

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
