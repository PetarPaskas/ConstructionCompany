using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.UserDto
{
    public record GetUsersDto
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Nickname { get; set; }
        public double HourlyRate { get; set; }
        public bool IsDisabled { get; set; }
        public DateTime EmploymentStartDate { get; set; }
        public DateTime? EmploymentEndDate { get; set; }
        public StrippedProfessionModel Profession { get; set; }
        public StrippedCurrencyModel Currency { get; set; }
        public StrippedConstructionSiteModel ConstructionSite { get; set; }
        public IEnumerable<StrippedWageModel> Wages { get; set; }
    }
}
