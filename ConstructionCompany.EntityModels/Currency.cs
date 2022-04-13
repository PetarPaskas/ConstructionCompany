using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class Currency
    {
        public int CurrencyId { get; set; }
        public string DisplayName { get; set; }
        public int CurrencyCode { get; set; }
        public IEnumerable<User> Users { get; set; }
    }
}
