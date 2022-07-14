using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Globals
{
    public class Constants
    {
        private readonly IConfiguration _configuration;
        public Constants(IConfiguration config)
        {
            _configuration = config;
        }
       public string ConnectionString { get
            {
                if (_configuration["ASPNETCORE_ENVIRONMENT"].Equals("Development"))
                {
                    return _configuration.GetConnectionString("Localhost");
                }
                return _configuration.GetConnectionString("Default");
            } }
    }
}
