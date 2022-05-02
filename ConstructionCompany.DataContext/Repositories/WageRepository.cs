using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class WageRepository : Repository<Wage>, IWageRepository
    {
        public WageRepository(ConstructionCompanyContext ctx)
            :base(ctx)
        {

        }
    }
}
