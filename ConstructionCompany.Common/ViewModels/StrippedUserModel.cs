using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.ViewModels
{
    public record StrippedUserModel
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string ProfessionName { get; set; }
    }
}
