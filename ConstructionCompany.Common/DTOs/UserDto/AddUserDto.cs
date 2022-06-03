using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.UserDto
{
    public record AddUserDto
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string Nickname { get; set; }
        public DateOnly DateStartedWorking { get; set; }
        public DateOnly WorksUntil { get; set; }
        public double HourlyRate { get; set; }
        public int CurrencyId { get; set; }
        public int ProfessionId { get; set; }
        public int RoleId { get; set; }
        public IEnumerable<int> ConstructionSites { get; set; }
        public bool IsDisabled { get; set; }
    }
}
