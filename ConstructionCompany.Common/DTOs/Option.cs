using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs
{
    public record Option
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public string Name { get; set; }
        public bool IsSelected { get; set; }
    }
}
