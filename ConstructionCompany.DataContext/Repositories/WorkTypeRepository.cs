using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class WorkTypeRepository : Repository<WorkType>, IWorkTypeRepository
    {
        public WorkTypeRepository(ConstructionCompanyContext context)
           :base(context)
        {

        }
    }
}
