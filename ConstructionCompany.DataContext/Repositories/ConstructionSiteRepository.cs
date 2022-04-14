using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class ConstructionSiteRepository : Repository<ConstructionSite>,IConstructionSiteRepository
    {
        public ConstructionSiteRepository(ConstructionCompanyContext context)
            : base(context)
        {

        }
    }
}
