using Microsoft.VisualBasic;

namespace Warehouse2.Models
{
    public class Event
    {

        public Event() { }

        public Event(string action, string dscr, string WKey, string CKey = "", string UKey = "")
        {
            this._key = Guid.NewGuid().ToString();
            this._from = "WAREHOUSE/" + WKey;               // fix from-to according to the data model
            this._to = "CELL/" + CKey;
            this.cellKey = CKey;
            this.userKey = UKey;
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

    public class EventFilterBody
    {
        public EventFilterBody()
        {
            this._key = "";
            this.cellKey = "";
            this.userKey = "";
            this.action = "";
            this.description = "";
            this.startdateAndTime = DateTimeOffset.Parse("1900-01-01 00:00:00-03:00");
            this.enddateAndTime = DateTimeOffset.Parse("2050-12-12 00:00:00-03:00");
        }

        public string _key { get; set; }

        public int page { get; set; }

        public string? cellKey { get; set; }

        public string? userKey { get; set; }

        public string action { get; set; }

        public DateTimeOffset? startdateAndTime { get; set; }
        public DateTimeOffset? enddateAndTime { get; set; }

        public string description { get; set; }
    }

    public class Period
    {
        public Period()
        {
            this.start = DateTimeOffset.Parse("1900-01-01 00:00:00-03:00");
            this.end = DateTimeOffset.Parse("2050-12-12 00:00:00-03:00");
        }

        public DateTimeOffset? start { get; set; }

        public DateTimeOffset? end { get; set; }
    }

    public class ActionBody
    {
        public ActionBody()
        {
            this.eventAction = "";
            this.warehouseKey = "";
            this.start = DateTimeOffset.Parse("1900-01-01 00:00:00-03:00");
            this.end = DateTimeOffset.Parse("2050-12-12 00:00:00-03:00");
        }

        public string eventAction { get; set; }

        public string warehouseKey { get; set; }

        public DateTimeOffset? start { get; set; }

        public DateTimeOffset? end { get; set; }
    }

    public class EventPage
    {
        public EventPage()
        {
            this.count = 0;
            this.events = new List<Event>();
        }

        public List<Event> events { get; set; }

        public decimal count { get; set; }
    }
}
