using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.ConstructionSiteDto
{
    public record AddEditConstructionSiteDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public bool IsFinished { get; set; }
        public DateTime DateStarted { get; set; }
        public DateTime ExpectedEndDate { get; set; }
        public int CityId { get; set; }
        public string ClientId { get; set; }
        public IEnumerable<int> Users { get; set; }
    }
}
