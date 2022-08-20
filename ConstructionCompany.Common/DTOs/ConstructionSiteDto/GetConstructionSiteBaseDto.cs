using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.ConstructionSiteDto
{
    public record GetConstructionSiteBaseDto
    {
        public int ConstructionSiteId { get; set; }
        public string DisplayName { get; set; }
        public string Address { get; set; }
        public bool IsFinished { get; set; }
        public DateTime DateStarted { get; set; }
        public DateTime? ExpectedEndDate { get; set; }
        public StrippedCityModel City { get; set; }
    }
}
