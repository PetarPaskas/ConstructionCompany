using ConstructionCompany.DataContext;
using ConstructionCompany.DataContext.Globals;
using Microsoft.AspNetCore.Builder;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json;

namespace ConstructionCompany.WebAPI
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore();

            services.AddAuthorization();

            services.AddCors(policy =>
            {
                policy.AddPolicy(name: "DevelopmentPolicy", options =>
                {

                     options.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                });
            });

            services
                .AddControllers()
                .AddJsonOptions(options =>
                {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                });

            services.AddConstructionCompanyContext();

            services.AddDependencyInjection(null);

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(name: "v1", info: new OpenApiInfo
                { Title = "Construction Company Service API Petar Paskaš", Version = "v1" });
            });

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseHsts();

            app.UseRouting();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseSwagger();

                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json",
                    "ConstructionCompany Service API Version 1");
                });

                app.UseCors("DevelopmentPolicy");

            }

            app.UseHttpsRedirection();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

            });
        }
    }
}
