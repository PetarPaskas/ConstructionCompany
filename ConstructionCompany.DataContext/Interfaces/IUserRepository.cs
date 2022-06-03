using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<IEnumerable<User>> GetAllUsersWithProfessionAndConstructionSiteAsync();
        Task<IEnumerable<User>> GetUsersWithProfessionAndConstructionSiteForDateAsync(DateTime date);
        Task<IEnumerable<User>> GetAllWithNavProperties();
        Task<IEnumerable<User>> GetAllUsersForConstructionSite(int constructionSiteId);
        Task<User> GetUserWithNavProperties(int id);
        Task<bool> DisableUser(int userId);
        Task<bool> EnableUser(int userId);
    }
}
