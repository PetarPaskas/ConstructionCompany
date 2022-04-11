using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Nickname { get; set; }
        public string FullName { get { return $"{Name} {Surname}"; } }
        public string HourlyRate { get; set; }
        public bool IsDisabled { get; set; }
        public DateOnly EmploymentStartDate { get; set; }
        public DateOnly EmploymentEndDate { get; set; }
        public string Password { get; set; }
        public int ProfessionId { get; set; }
        public Profession Profession { get; set; }
        public IEnumerable<UserRole> UserRole { get; set; }
    }
}
