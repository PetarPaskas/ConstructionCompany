using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public enum FileTypeEnum
    {
        XlsFile = 1,
        XlsxFile = 2
    }

    public class FileRequestData
    {
        public DateTime Date { get; set; }
        public FileTypeEnum FileType { get; set; }
    }
}
