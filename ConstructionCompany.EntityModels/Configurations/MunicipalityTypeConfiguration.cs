using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class MunicipalityTypeConfiguration : IEntityTypeConfiguration<Municipality>
    {
        public void Configure(EntityTypeBuilder<Municipality> builder)
        {
            builder.ToTable("Municipalities");

            builder.HasKey(m => m.MunicipalityId);

            builder.HasAlternateKey(m => m.MunicipalityCode);

            builder.Property(m => m.MunicipalityCode)
                .IsRequired();

            builder.Property(m => m.DisplayName)
                .IsRequired();
                
        }

    }
}
