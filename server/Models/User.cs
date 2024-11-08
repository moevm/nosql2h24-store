

namespace Warehouse2.Models
{
    public class User
    {
        public User() { }
        
        public string Id { get; set; }

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
