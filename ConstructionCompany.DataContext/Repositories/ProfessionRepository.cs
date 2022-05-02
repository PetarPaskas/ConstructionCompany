using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class ProfessionRepository : Repository<Profession>, IProfessionRepository
    {
        public ProfessionRepository(ConstructionCompanyContext context) 
            :base(context)
        {

        }
    }
}
