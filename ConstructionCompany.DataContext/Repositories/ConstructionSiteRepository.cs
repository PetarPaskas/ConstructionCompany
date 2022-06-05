using ConstructionCompany.Common.DTOs.ConstructionSiteDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

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

        public async Task<IEnumerable<ConstructionSite>> GetallForOptions()
        {
            return await _constructionCompanyContext.ConstructionSites.ToListAsync();
        }

        public async Task<ConstructionSite> UpdateConstructionSiteAsync(int constructionSiteId, AddEditConstructionSiteDto constructionSiteDto)
        {
           ConstructionSite cs = await _constructionCompanyContext.ConstructionSites
                                            .Include(cs=>cs.Users)
                                            .SingleOrDefaultAsync(cs=>cs.ConstructionSiteId == constructionSiteId);

           await ManageUsersForConstructionSite(constructionSiteId, cs, constructionSiteDto);

            cs.Address = constructionSiteDto.Address;
            cs.CityId = constructionSiteDto.CityId;
            cs.ClientId = constructionSiteDto.ClientId;
            cs.DateFinished = constructionSiteDto.DateFinished.HasValue ? constructionSiteDto.DateFinished.Value : cs.DateFinished;
            cs.IsFinished = constructionSiteDto.IsFinished;
            cs.DisplayName = constructionSiteDto.Name;
            cs.DateStarted = constructionSiteDto.DateStarted;

            await _constructionCompanyContext.SaveChangesAsync();

            return cs;
        }



        public async Task<ConstructionSite> AddConstructionSiteAsync(AddEditConstructionSiteDto cosntructionSiteDto)
        {
                var cs = cosntructionSiteDto.AsConstructionSite();

                await _constructionCompanyContext.ConstructionSites.AddAsync(cs);

                await _constructionCompanyContext.SaveChangesAsync();

                await ManageUsersForConstructionSite(cs.ConstructionSiteId, cs, cosntructionSiteDto);

                await _constructionCompanyContext.SaveChangesAsync();

            return cs; 
        }

        private async Task ManageUsersForConstructionSite(int constructionSiteId, ConstructionSite cs, AddEditConstructionSiteDto constructionSiteDto)
        {
            if(cs.Users.Count() > 0)
            {
                foreach (var user in cs.Users)
                {
                    user.ConstructionSiteId = null;
                }
            }

            if(constructionSiteDto.Users.Count() > 0)
            {
                var newUsers = await _constructionCompanyContext.Users.Where(user => constructionSiteDto.Users.Contains(user.UserId)).ToListAsync();

                foreach (User newUser in newUsers)
                {
                    newUser.ConstructionSiteId = constructionSiteId;
                }
            }
        }
    }
}
