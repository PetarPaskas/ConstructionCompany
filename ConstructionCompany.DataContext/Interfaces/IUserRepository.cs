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
        Task<IEnumerable<User>> GetAllWithNavPropertiesAsync();
        Task<IEnumerable<User>> GetAllUsersForConstructionSiteAsync(int constructionSiteId);
        Task<User> GetUserWithNavPropertiesAsync(int id);
        Task<bool> DisableUserAsync(int userId);
        Task<bool> EnableUserAsync(int userId);
    }
}
