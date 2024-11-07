using Microsoft.VisualBasic;

namespace Warehouse2.Models
{
    public class Event
    {

        public Event(string action, string description)
        {
            Action = action;
            Descritpion = description;
            DateAndTime = 0;
        }

        public string? Id { get; set; }

        public string? CellId { get; set; }

        public string? UserId { get; set; }

        public string Action { get; set; }

        public int DateAndTime { get; set; }

        public string Descritpion { get; set; }
    }
}
