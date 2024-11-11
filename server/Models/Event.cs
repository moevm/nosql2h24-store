using Microsoft.VisualBasic;

namespace Warehouse2.Models
{
    public class Event
    {

        public Event() { }

        public Event(string action, string dscr, string WId, string CId = "")
        {
            this._key = Guid.NewGuid().ToString();
            this._from = WId;
            this._to = CId;
            this.cellId = CId;
            this.userId = "";
            this.action = action;
            this.descritpion = dscr;
            this.dateAndTime = DateTime.Now;
        }

        public string _key { get; set; }

        public string _from { get; set; }

        public string _to { get; set; }

        public string? cellId { get; set; }

        public string? userId { get; set; }

        public string action { get; set; }

        public DateTimeOffset dateAndTime { get; set; }

        public string descritpion { get; set; }
    }
}
