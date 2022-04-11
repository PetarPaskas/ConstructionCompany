using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class Client
    {
        public string ClientId { get; set; }
        public string ClientName { get; set; }
        public string ClientAddress { get; set; }
        public IEnumerable<ConstructionSite> ConstructionSites { get; set; }
    }
}
