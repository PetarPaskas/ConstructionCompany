using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class ClientRepository : Repository<Client>, IClientRepository
    {
        private ConstructionCompanyContext _constructionCompanyContext;
        public ClientRepository(ConstructionCompanyContext context)
        : base((DbContext)context)
        {
            _constructionCompanyContext = context;
        }

        public async Task<IEnumerable<Client>> GetAllForOptions()
        {
            return await _constructionCompanyContext.Clients.ToListAsync();
        }
    }
}
