using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.WagesDto
{
    public class PutWagesDto
    {
        public DateTime Date { get; set; }
        public IEnumerable<WagesInfo> Data { get; set; }
    }
}
