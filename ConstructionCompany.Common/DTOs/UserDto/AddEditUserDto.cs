using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.UserDto
{
    public record AddEditUserDto
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string Nickname { get; set; }
        public DateTime EmploymentStartDate { get; set; }
        public DateTime? EmploymentEndDate { get; set; }
        public double HourlyRate { get; set; }
        public int CurrencyId { get; set; }
        public int ProfessionId { get; set; }
        public int? ConstructionSitesId { get; set; }
        public bool IsDisabled { get; set; }
    }
}

//Napravi da se gradiliste i radnik povezuju preko datuma