using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class WageRepository : Repository<Wage>, IWageRepository
    {
        private readonly ConstructionCompanyContext _context;
        public WageRepository(ConstructionCompanyContext ctx)
            :base(ctx)
        {
            _context = ctx;
        }

        public async Task<IEnumerable<Wage>> GetAllForDateAsync(DateTime date)
        {
            return await GetAllForDate(date);
        }

        public async Task<IEnumerable<Wage>> GetAllForDateAsync(DateOnly date)
        {
            return await GetAllForDate(new DateTime(date.Year, date.Month, date.Day));
        }

        private async Task<List<Wage>> GetAllForDate(DateTime date)
        {
            var startDate = DateOnly.FromDateTime(new DateTime(date.Year, date.Month, 1));
            var endDate = DateOnly.FromDateTime(date);

            var data = await _context.Wages.Where(wage => wage.WorkDay.Month == date.Month)
            .Include(w=>w.ConstructionSite)
            .ThenInclude(cs=>cs.City)
            .Include(w=>w.User)
            .ThenInclude(u=>u.Currency)
            .ToListAsync();

            return data;
        }
    }
}
