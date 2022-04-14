using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class CurrencyRepository : Repository<Currency>,ICurrencyRepository
    {
        public CurrencyRepository(ConstructionCompanyContext context)
            : base(context)
        {

        }
    }
}
