namespace Warehouse2.Models
{
    public class Data
    {
        public Data() { }

        public List<User> users { get; set; }

        public List<Cell> cells { get; set; }

        public List<Event> events { get; set; }

        public List<Warehouse> warehouses { get; set; }
    }
}
