using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class CityRepository : Repository<City>, ICityRepository
    {
        private ConstructionCompanyContext _constructionCompanyContext;
        public CityRepository(ConstructionCompanyContext context) 
        : base(context)
        {
            _constructionCompanyContext = context;
        }

        public async Task<IEnumerable<City>> GetAllCitiesWithNavPropAsync()
        {
            return await _constructionCompanyContext.Cities
                                                    .Include(c => c.Municipality)
                                                    .ToListAsync();
        }
    }
}
