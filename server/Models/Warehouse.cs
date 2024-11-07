namespace Warehouse2.Models
{
    public class Warehouse
    {
        public Guid Id { get; set; }

        public string? address { get; set; }

        public int? capacity { get; set; }

        public int? chiefId { get; set; }

        public Guid[]? cells { get; set; }
    }
}
