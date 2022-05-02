using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public record StrippedConstructionSiteModel
    {
        public int ConstructionSiteId { get; set; }
        public string ConstructionSiteName { get; set; }
    }
}
