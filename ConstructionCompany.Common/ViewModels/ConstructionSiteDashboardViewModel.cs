using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.ViewModels
{
    public record ConstructionSiteDashboardViewModel
    {
        public int ConstructionSiteId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string CityName { get; set; }
        public StrippedClientModel Client { get; set; }
    }
}
