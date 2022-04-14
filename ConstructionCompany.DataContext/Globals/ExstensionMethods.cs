using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Globals
{
    public static class ExstensionMethods
    {
        public static void AddConstructionCompanyContext(this IServiceCollection services, string connectionString = Constants.SQL_SERVER_CONNECTION_STRING_LOCALHOST)
        {
            services.AddDbContext<ConstructionCompanyContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });
        }
    }
}
