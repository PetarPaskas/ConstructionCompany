using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class Profession
    {
        public int ProfessionId { get; set; }
        public string ProfessionCode { get; set; }
        public string DisplayName { get; set; }
        public IEnumerable<User> Users { get; set; }
    }
}
