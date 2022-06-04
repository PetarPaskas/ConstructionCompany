using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class UserRepository :Repository<User>, IUserRepository
    {
        private ConstructionCompanyContext _constructionCompanyContext;
        public UserRepository(ConstructionCompanyContext context)
            :base(context)
        {
            _constructionCompanyContext = context;
        }

        public async Task<bool> DisableUserAsync(int userId)
        {
            return await ModifyIsDisabledOnUser(userId, true);
        }

        public async Task<bool> EnableUserAsync(int userId)
        {
            return await ModifyIsDisabledOnUser(userId, false);
        }

        private async Task<bool> ModifyIsDisabledOnUser(int userId, bool shouldDisableUser)
        {
            User selectedUser = await _constructionCompanyContext.Users.SingleAsync(u => u.UserId == userId);

            selectedUser.IsDisabled = shouldDisableUser;

            await _constructionCompanyContext.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<User>> GetAllUsersForConstructionSiteAsync(int constructionSiteId)
        {
            var result = await _constructionCompanyContext
                 .Users.Where(u => u.ConstructionSiteId == constructionSiteId)
                 .Include(u => u.ConstructionSite)
                 .Include(u => u.Currency)
                 .Include(u => u.Profession)
                 .ToListAsync();

            return await Task.FromResult<IEnumerable<User>>(result);
        }

        public async Task<IEnumerable<User>> GetAllUsersWithProfessionAndConstructionSiteAsync()
        {
            var result = await _constructionCompanyContext.Wages
                .Include(w => w.User)
                .ThenInclude(u => u.Profession)
                .Include(w => w.User)
                .ThenInclude(u => u.Currency)
                .Include(w => w.ConstructionSite)
                .ToListAsync();

            return await Task.FromResult<IEnumerable<User>>(result.Select(w => w.User));

        }

        public async Task<IEnumerable<User>> GetAllWithNavPropertiesAsync()
        {
                var result = await _constructionCompanyContext.Users
                                    .Include(u=>u.Currency)
                                    .Include(u=>u.Profession)
                                    .Include(u=>u.ConstructionSite)
                                    .ToListAsync();

            return await Task.FromResult<IEnumerable<User>>(result);
        }

        public async Task<IEnumerable<User>> GetUsersWithProfessionAndConstructionSiteForDateAsync(DateTime date)
        {

            var result = await _constructionCompanyContext.Wages
                .Where(w=>w.WorkDay.Equals(date))
                .Include(w => w.User)
                .ThenInclude(u => u.Profession)
                .Include(w => w.User)
                .ThenInclude(u => u.Currency)
                .Include(w => w.ConstructionSite)
                .ToListAsync();

            return await Task.FromResult<IEnumerable<User>>(result.Select(w => w.User));

        }

        public async Task<User> GetUserWithNavPropertiesAsync(int id)
        {
            return await _constructionCompanyContext.Users
                .Include(u=>u.Profession)
                .Include(u=>u.ConstructionSite)
                .Include(u=>u.Currency)
                .Include(u=>u.Wages)
                .ThenInclude(w=>w.ConstructionSite)
                .SingleAsync(u=>u.UserId == id);
                
        }
    }
}
