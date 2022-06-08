using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class CurrencyRepository : Repository<Currency>,ICurrencyRepository
    {
        private ConstructionCompanyContext _constructionCompanyContext;
        public CurrencyRepository(ConstructionCompanyContext context)
            : base(context)
        {
            _constructionCompanyContext = context;
        }

        public async Task<IEnumerable<Currency>> GetAllForOptions()
        {
            return await _constructionCompanyContext.Currencies.ToListAsync();
        }
    }
}
