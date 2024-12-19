

using Microsoft.VisualBasic;

namespace Warehouse2.Models
{
    public class User
    {
        public User() { }

        public User(string NSP, string role, string login, string psw, string bd) 
        {
            this._key = Guid.NewGuid().ToString();
            this.nameSurnamePatronymic = NSP;
            this.role = role;
            this.login = login;
            this.password = psw;
            this.birthday = DateTimeOffset.Parse(bd);
            this.regDate = DateTime.Now;
            this.editDate = DateTime.Now;
            this.indebtedness = 0;
        }

        public string? _key { get; set; }

        public string? nameSurnamePatronymic { get; set; }

        public string role { get; set; }

        public string login { get; set; }

        public string password { get; set; }

        public DateTimeOffset birthday { get; set; }

        public DateTimeOffset regDate { get; set; }

        public DateTimeOffset editDate { get; set; }

        public int indebtedness { get; set; }
    }

    public class UserFilterBody
    {
        public UserFilterBody()
        {
            this._key = "";
            this.login = "";
            this.password = "";
            this.nameSurnamePatronymic = "";
            this.role = "";
            this.startindebtedness = 0;
            this.endindebtedness = 100000;

            this.startbirthday = DateTimeOffset.Parse("1900-01-01");
            this.endbirthday = DateTimeOffset.Parse("2050-12-12");

            this.startregDate = DateTimeOffset.Parse("1900-01-01 00:00:00-03:00");
            this.endregDate = DateTimeOffset.Parse("2050-12-12 00:00:00-03:00");

            this.starteditDate = DateTimeOffset.Parse("1900-01-01 00:00:00-03:00");
            this.endeditDate = DateTimeOffset.Parse("2050-12-12 00:00:00-03:00");
        }

        public string _key { get; set; }

        public string? nameSurnamePatronymic { get; set; }

        public string role { get; set; }

        public string login { get; set; }

        public string password { get; set; }

        public DateTimeOffset startbirthday { get; set; }
        public DateTimeOffset endbirthday { get; set; }

        public DateTimeOffset startregDate { get; set; }
        public DateTimeOffset endregDate { get; set; }

        public DateTimeOffset? starteditDate { get; set; }
        public DateTimeOffset? endeditDate { get; set; }

        public int startindebtedness { get; set; }
        public int endindebtedness { get; set; }
    }

    public class EmployeeFixedCell
    {
        public EmployeeFixedCell(string key = "", string NSP = "", int c = 0)
        {
            this._key = key;
            this.nameSurnamePatronymic = NSP;
            this.count = c;
        }

        public string? _key { get; set; }

        public string? nameSurnamePatronymic { get; set; }

        public int count { get; set; }
    }

    public class PassData
    {
        public PassData()
        { }

        public string email { get; set; }

        public string password { get; set; }
    }

    public class AuthData
    {
        public AuthData(string _key, string NSP, string role) 
        {
            this._key = _key;
            this.nameSurnamePatronymic = NSP;
            this.role = role;
        }

        public string _key { get; set; }

        public string nameSurnamePatronymic { get; set; }

        public string role { get; set; }
    }
}
