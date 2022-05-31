using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class Municipality
    {
        public int MunicipalityId { get; set; }
        public string DisplayName { get; set; }
        public int MunicipalityCode { get; set; }
        public IEnumerable<City> Cities { get; set; }

    }
}
