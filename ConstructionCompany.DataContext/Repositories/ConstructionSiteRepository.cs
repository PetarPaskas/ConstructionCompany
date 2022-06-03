using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class ConstructionSiteRepository : Repository<ConstructionSite>,IConstructionSiteRepository
    {
        private ConstructionCompanyContext _constructionCompanyContext;
        public ConstructionSiteRepository(ConstructionCompanyContext context)
            : base(context)
        {
            _constructionCompanyContext = context;
        }

        private async Task<bool> ModifyIsDisabledOnConstructionCompany(int constructionSiteId, bool shouldDisableSite)
        {
            ConstructionSite cs = await _constructionCompanyContext.ConstructionSites.SingleAsync(cs => cs.ConstructionSiteId == constructionSiteId);

            cs.IsFinished = shouldDisableSite;

            await _constructionCompanyContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DisableConstructionSiteAsync(int constructionSiteId)
        {
           return await ModifyIsDisabledOnConstructionCompany(constructionSiteId, true);
        }

        public async Task<bool> EnableConstructionSiteAsync(int constructionSiteId)
        {
            return await ModifyIsDisabledOnConstructionCompany(constructionSiteId, false);
        }

        public async Task<IEnumerable<ConstructionSite>> GetAllWithNavPropertiesAsync()
        {
            IEnumerable<ConstructionSite> cs =  await _constructionCompanyContext
                                                        .ConstructionSites
                                                        .Include(cs => cs.City)
                                                        .ThenInclude(c => c.Municipality)
                                                        .Include(cs => cs.Clients)
                                                        .ToListAsync();

            return await Task.FromResult(cs);
        }

        public async Task<ConstructionSite> GetSingleWithNavPropertiesAsync(int constructionSiteId)
        {
            ConstructionSite cs = await _constructionCompanyContext
                                            .ConstructionSites
                                            .Include(cs => cs.City)
                                            .ThenInclude(c=>c.Municipality)
                                            .Include(cs => cs.Clients)
                                            .SingleAsync(cs=>cs.ConstructionSiteId==constructionSiteId);

            return await Task.FromResult(cs);
        }
    }
}
