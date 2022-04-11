using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleCode { get; set; }
        public string DisplayName { get; set; }
        public IEnumerable<UserRole> UserRole { get; set; }
    }
}
