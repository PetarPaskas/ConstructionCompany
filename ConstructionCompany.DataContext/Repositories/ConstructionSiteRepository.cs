using ConstructionCompany.Common.DTOs.ConstructionSiteDto;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
                                                        .Where(cs=>!cs.IsFinished)
                                                        .Include(cs => cs.City)
                                                        .ThenInclude(c => c.Municipality)
                                                        .Include(cs => cs.Client)
                                                        .ToListAsync();

            return await Task.FromResult(cs);
        }

        public async Task<ConstructionSite> GetSingleWithNavPropertiesAsync(int constructionSiteId)
        {
            ConstructionSite cs = await _constructionCompanyContext
                                            .ConstructionSites
                                            .Include(cs => cs.City)
                                            .ThenInclude(c=>c.Municipality)
                                            .Include(cs => cs.Client)
                                            .SingleOrDefaultAsync(cs=>cs.ConstructionSiteId==constructionSiteId);

            return await Task.FromResult(cs);
        }

        public async Task<IEnumerable<ConstructionSite>> GetallForOptions()
        {
            return await _constructionCompanyContext.ConstructionSites.Where(cs=>!cs.IsFinished).ToListAsync();
        }

        public async Task<ConstructionSite> UpdateConstructionSiteAsync(int constructionSiteId, AddEditConstructionSiteDto constructionSiteDto)
        {
           ConstructionSite cs = await _constructionCompanyContext.ConstructionSites
                                            .Include(cs=>cs.Users)
                                            .Include(cs=>cs.Client)
                                            .Include(cs=>cs.City)
                                            .ThenInclude(c=>c.Municipality)
                                            .SingleOrDefaultAsync(cs=>cs.ConstructionSiteId == constructionSiteId);

           await ManageUsersForConstructionSite(constructionSiteId, cs, constructionSiteDto);

            cs.Address = constructionSiteDto.Address;
            cs.CityId = constructionSiteDto.CityId;
            cs.ClientId = constructionSiteDto.ClientId;
            cs.DateFinished = constructionSiteDto.ExpectedEndDate;
            cs.IsFinished = constructionSiteDto.IsFinished;
            cs.DisplayName = constructionSiteDto.Name;
            cs.DateStarted = constructionSiteDto.DateStarted;

            await _constructionCompanyContext.SaveChangesAsync();

            await _constructionCompanyContext.Users
                                 .Where(user => constructionSiteDto.Users.Contains(user.UserId))
                                 .LoadAsync();

            await _constructionCompanyContext.Cities.Include(c=>c.Municipality).SingleOrDefaultAsync(c=> c.CityId == cs.CityId);

            return cs;
        }



        public async Task<ConstructionSite> AddConstructionSiteAsync(AddEditConstructionSiteDto constructionSiteDto)
        {
                var cs = constructionSiteDto.AsConstructionSite();

                await _constructionCompanyContext.ConstructionSites.AddAsync(cs);

                await ManageUsersForConstructionSite(cs.ConstructionSiteId, cs, constructionSiteDto);

                await _constructionCompanyContext.SaveChangesAsync();

                await _constructionCompanyContext.Users
                                                 .Where(user => constructionSiteDto.Users.Contains(user.UserId))
                                                 .LoadAsync();

            return cs; 
        }

        private async Task ManageUsersForConstructionSite(int constructionSiteId, ConstructionSite cs, AddEditConstructionSiteDto constructionSiteDto)
        {
            try
            {
                if (constructionSiteId != 0)
                {
                    if (!(constructionSiteDto.Users is null) && constructionSiteDto.Users.Count() > 0)
                    {
                        var newUsers = await _constructionCompanyContext.Users.Where(u => constructionSiteDto.Users.Contains(u.UserId)).ToListAsync();

                        foreach (var user in cs.Users)
                        {
                            user.ConstructionSiteId = null;
                        }

                        foreach (var newUser in newUsers)
                        {
                            newUser.ConstructionSiteId = constructionSiteId;
                        }

                    }
                    else
                    {
                        foreach (var user in cs.Users)
                            user.ConstructionSiteId = null;
                    }
                }
                else
                {
                    if (constructionSiteDto.Users.Count() > 0)
                    {
                        var readyUsers = await _constructionCompanyContext.Users.Where(u => constructionSiteDto.Users.Contains(u.UserId)).ToListAsync();
                        foreach (var user in readyUsers)
                        {
                            user.ConstructionSite = cs;
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                Debug.WriteLine(ex.Message);
            }

            await _constructionCompanyContext.Cities
                .Where(c => c.CityId == cs.CityId)
                .Include(c=>c.Municipality)
                .LoadAsync();

            await _constructionCompanyContext.Clients
                .Where(c => c.ClientId.Equals(cs.ClientId))
                .LoadAsync();

        }

        public void OneTimeThing()
        {
            var sites = _constructionCompanyContext.ConstructionSites.ToList();

            for(int i = 0; i < sites.Count; i++)
            {
                sites[i].DisplayName = sites[i].DisplayName + $" {i}";
            }
            _constructionCompanyContext.SaveChanges();
        }
    }
}
