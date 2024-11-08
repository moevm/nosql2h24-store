using Microsoft.VisualBasic;

namespace Warehouse2.Models
{
    public class Event
    {

        public Event(string action, string description, int dat)
        {
            Action = action;
            Descritpion = description;
            DateAndTime = dat;
        }

        public string? Id { get; set; }

        public string? CellId { get; set; }

        public string? UserId { get; set; }

        public string Action { get; set; }

        public int DateAndTime { get; set; }

        public string Descritpion { get; set; }
    }
}
