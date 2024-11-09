using Microsoft.VisualBasic;

namespace Warehouse2.Models
{
    public class Event
    {

        public Event() { }

        public Event(string action, string dscr, int dat, string WId, string CId = "")
        {
            this.Key = Guid.NewGuid().ToString();
            this.From = WId;
            this.To = CId;
            this.CellId = CId;
            this.UserId = "";
            this.Action = action;
            this.Descritpion = dscr;
            this.DateAndTime = dat;
        }

        public string? Key { get; set; }

        public string? From { get; set; }

        public string? To { get; set; }

        public string? CellId { get; set; }

        public string? UserId { get; set; }

        public string Action { get; set; }

        public int DateAndTime { get; set; }

        public string Descritpion { get; set; }
    }
}
