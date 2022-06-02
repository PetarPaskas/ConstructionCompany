using ConstructionCompany.DataContext;
using ConstructionCompany.DataContext.Globals;

namespace ConstructionCompany.WebAPI
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore();

            services.AddAuthorization();

            services.AddCors();

            services.AddControllers();

            services.AddConstructionCompanyContext();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

        }
    }
}
