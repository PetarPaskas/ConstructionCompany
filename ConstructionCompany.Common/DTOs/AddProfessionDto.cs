using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs
{
    public record AddProfessionDto
    {
        public string ProfessionName { get; set; }
        public string ProfessionCodeName { get; set; }
    }
}
