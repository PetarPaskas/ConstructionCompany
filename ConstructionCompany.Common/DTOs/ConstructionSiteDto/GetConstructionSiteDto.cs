using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.ConstructionSiteDto
{
    public record GetConstructionSiteDto : GetConstructionSiteBaseDto
    {

        public StrippedClientModel Client { get; set; }

    }
}
