using ConstructionCompany.Common.DTOs.ConstructionSiteDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Interfaces
{
    public interface IConstructionSiteRepository : IRepository<ConstructionSite>
    {
        Task<IEnumerable<ConstructionSite>> GetAllWithNavPropertiesAsync();
        Task<ConstructionSite> GetSingleWithNavPropertiesAsync(int constructionSiteId);
        Task<bool> DisableConstructionSiteAsync(int constructionSiteId);
        Task<bool> EnableConstructionSiteAsync(int constructionSiteId);
        Task<IEnumerable<ConstructionSite>> GetallForOptions();
        Task<ConstructionSite> UpdateConstructionSiteAsync(int constructionSiteId, AddEditConstructionSiteDto constructionSiteDto);
        Task<ConstructionSite> AddConstructionSiteAsync(AddEditConstructionSiteDto cosntructionSiteDto);
    }
}
