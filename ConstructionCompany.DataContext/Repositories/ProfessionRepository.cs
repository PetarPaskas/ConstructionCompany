using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class ProfessionRepository : Repository<Profession>, IProfessionRepository
    {
        private ConstructionCompanyContext _constructionCompanyContext;
        public ProfessionRepository(ConstructionCompanyContext context) 
            :base(context)
        {
            _constructionCompanyContext = context;
        }

        public async Task<IEnumerable<Profession>> GetAllProfessionsAsync()
        {
            return await _constructionCompanyContext.Professions.ToListAsync();
        }
    }
}
