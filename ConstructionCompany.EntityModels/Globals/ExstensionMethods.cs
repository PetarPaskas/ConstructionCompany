using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ConstructionCompany.EntityModels.Configurations;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Globals
{
    public static class ExstensionMethods
    {
        public static void ApplyConstructionCompanyEntityTypeConfigurations(this ModelBuilder builder)
        {
            builder.ApplyConfiguration(new CityTypeConfiguration());
            builder.ApplyConfiguration(new ClientTypeConfiguration());
            builder.ApplyConfiguration(new ConstructionSiteTypeConfiguration());
            builder.ApplyConfiguration(new CurrencyTypeConfiguration());
            builder.ApplyConfiguration(new EarlyPaymentTypeConfiguration());
            builder.ApplyConfiguration(new MunicipalityTypeConfiguration());
            builder.ApplyConfiguration(new NoteTypeConfiguration());
            builder.ApplyConfiguration(new PaymentTypeTypeConfiguration());
            builder.ApplyConfiguration(new ProfessionTypeConfiguration());
            builder.ApplyConfiguration(new RoleTypeConfiguration());
            builder.ApplyConfiguration(new UserTypeConfiguration());
            builder.ApplyConfiguration(new UserRoleTypeConfiguration());
            builder.ApplyConfiguration(new WageTypeConfiguration());
            builder.ApplyConfiguration(new WorkTypeTypeConfiguration());
        }
    }
}
