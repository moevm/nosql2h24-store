using Microsoft.VisualBasic;

namespace Warehouse2.Models
{
    public class Event
    {

        public Event() { }

        public Event(string action, string dscr, string WKey, string CKey = "")
        {
            this._key = Guid.NewGuid().ToString();
            this._from = "WAREHOUSE/" + WKey;
            this._to = "CELL/" + CKey;
            this.cellKey = CKey;
            this.userKey = "";
            this.action = action;
            this.description = dscr;
            this.dateAndTime = DateTime.Now;
        }

        public string _key { get; set; }

        public string _from { get; set; }

        public string _to { get; set; }

        public string? cellKey { get; set; }

        public string? userKey { get; set; }

        public string action { get; set; }

        public DateTimeOffset dateAndTime { get; set; }

        public string description { get; set; }
    }
}
