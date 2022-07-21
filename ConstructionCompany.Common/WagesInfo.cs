using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public class WagesInfo
    {
        public int UserId { get; set; }
        public IEnumerable<WagesCarryData> Wages { get; set; }
    }
}
