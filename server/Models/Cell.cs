namespace Warehouse2.Models
{
    public class Cell
    {
        public Guid cellId { get; set; }

        public Guid? warehouseId { get; set; }
        
        public int? cellNum { get; set; }
        
        public int? tierNum { get; set; }
        
        public bool? isFree { get; set; }
        
        public int? endOfRent { get; set; }
        
        public int? tariffPerDay { get; set; }
        
        public int? size { get; set; }
        
        public Guid[]? listOfEventIds { get; set; }
    }
}
