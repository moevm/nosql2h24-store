

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
            this.birthday = bd;
            this.regDate = DateTime.Now;
            this.editDate = null;
            this.indebtedness = 0;
        }

        public string? _key { get; set; }

        public string? nameSurnamePatronymic { get; set; }

        public string role { get; set; }

        public string login { get; set; }

        public string password { get; set; }

        public string birthday { get; set; }

        public DateTimeOffset regDate { get; set; }

        public DateTimeOffset? editDate { get; set; }

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
        }

        public string _key { get; set; }

        public string? nameSurnamePatronymic { get; set; }

        public string role { get; set; }

        public string login { get; set; }

        public string password { get; set; }

        public string startbirthday { get; set; }
        public string endbirthday { get; set; }

        public DateTimeOffset startregDate { get; set; }
        public DateTimeOffset endregDate { get; set; }

        public DateTimeOffset? starteditDate { get; set; }
        public DateTimeOffset? endeditDate { get; set; }

        public int startindebtedness { get; set; }
        public int endindebtedness { get; set; }
    }
}
