﻿using ConstructionCompany.DataContext;
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

            services.AddCors();

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
                { Title = "Northwind Service API", Version = "v1" });
            });

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseHsts();

            app.UseRouting();

            app.UseCors(options =>
            {
                options.WithMethods("GET");
            });

            app.UseSwagger();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json",
                "ConstructionCompany Service API Version 1");
            });

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
