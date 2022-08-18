using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Interfaces
{
    public interface IWageRepository : IRepository<Wage>
    {
        Task<IEnumerable<Wage>> GetAllForDateAsync(DateTime date);
        Task<IEnumerable<Wage>> GetAllForDateAsync(DateOnly date);
    }
}
