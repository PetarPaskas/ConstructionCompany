using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileProcessOperationsHandler.ProcessTypes
{
    public class CellItem
    {
        public string CellText { get; set; }
        public IEnumerable<string> Comments { get; set; }
    }
}
