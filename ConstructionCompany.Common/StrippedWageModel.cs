using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public class StrippedWageModel
    {
        public int WageId { get; set; }
        public DateTime WorkDay { get; set; }
        public int HoursDone { get; set; }
        public int HoursRequired { get; set; }
        public StrippedConstructionSiteModel ConstructionSite { get; set; }

    }
}
