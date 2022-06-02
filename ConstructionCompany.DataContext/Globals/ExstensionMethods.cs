using ConstructionCompany.DataContext.Repositories;
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

        public static void AddDependencyInjection(this IServiceCollection services, Action<IServiceCollection> AppendInjection)
        {
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<IClientRepository, ClientRepository>();
            services.AddScoped<IConstructionSiteRepository, ConstructionSiteRepository>();
            services.AddScoped<ICurrencyRepository, CurrencyRepository>();
            services.AddScoped<IEarlyPaymentRepository, EarlyPaymentRepository>();
            services.AddScoped<IMunicipalityRepository, MunicipalityRepository>();
            services.AddScoped<INoteRepository, NoteRepository>();
            services.AddScoped<IPaymentTypeRepository, PaymentTypeRepository>();
            services.AddScoped<IProfessionRepository, ProfessionRepository>();
            services.AddScoped<IRoleRepository,RoleRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserRoleRepository,UserRoleRepository>();
            services.AddScoped<IWageRepository, WageRepository>();
            services.AddScoped<IWorkTypeRepository, WorkTypeRepository>();

            if(!(AppendInjection is null))
            AppendInjection(services);
        }
    }
}
