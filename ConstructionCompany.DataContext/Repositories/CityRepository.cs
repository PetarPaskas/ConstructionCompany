using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class CityRepository : Repository<City>, ICityRepository
    {
        public CityRepository(ConstructionCompanyContext context) 
        : base(context)
        {
        }
    }
}
