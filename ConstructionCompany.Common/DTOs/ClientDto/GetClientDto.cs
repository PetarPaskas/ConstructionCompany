using ConstructionCompany.Common.DTOs.ConstructionSiteDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.ClientDto
{
    public class GetClientDto
    {
        public string ClientId { get; set; }
        public string ClientName { get; set; }
        public string ClientAddress { get; set; }
        public IEnumerable<GetConstructionSiteBaseDto> ConstructionSites { get; set; }
    }
}
