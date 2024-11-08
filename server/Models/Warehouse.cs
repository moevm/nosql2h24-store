namespace Warehouse2.Models
{
    public class Warehouse
    {
        Warehouse() { }

        public string? Id { get; set; }

        public string? address { get; set; }

        public int? capacity { get; set; }

        public string? chiefId { get; set; }

        public string[]? cells { get; set; }
    }
}
