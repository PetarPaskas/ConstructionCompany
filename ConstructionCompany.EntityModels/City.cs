using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class City
    {
        public int CityId { get; set; }
        public string DisplayName { get; set; }
        public int CityCode { get; set; }
        public int MunicipalityId { get; set; }
        public Municipality Municipality { get; set; }
        public IEnumerable<ConstructionSite> ConstructionSites { get; set; }
    }
}
