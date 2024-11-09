

namespace Warehouse2.Models
{
    public class User
    {
        public User() { }

        public User(string NSP, string role, string login, string psw, int bd) 
        {
            this.Key = Guid.NewGuid().ToString();
            this.NameSurnamePatronymic = NSP;
            this.role = role;
            this.login = login;
            this.password = psw;
            this.birthday = bd;
            this.regDate = 0;
            this.editDate = 0;
            this.indebtedness = 0;
        }

        public string Key { get; set; }

        public string? NameSurnamePatronymic { get; set; }

        public string role { get; set; }

        public string login { get; set; }

        public string password { get; set; }

        public int birthday { get; set; }

        public int regDate { get; set; }

        public int? editDate { get; set; }

        public int indebtedness { get; set; }
    }
}
