using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.ViewModels
{
    public record UserDashboardViewModel
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Nickname { get; set; }
        public DateOnly WorksSince { get; set; }
        public DateOnly? WorksUntil { get; set; }
        public string ProfessionName { get; set; }
        public double HourlyRate { get; set; }
        public StrippedConstructionSiteModel CurrentlyWorkingConstructionSite { get; set; }
        public double BorrowedAmmount { get; set; }
    }
}
