using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class CityTypeConfiguration : IEntityTypeConfiguration<City>
    {
        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder.ToTable("Cities");

            builder.HasKey(c => c.CityId);
            builder.HasAlternateKey(c => c.CityCode);

            builder.Property(c => c.CityCode)
                .IsRequired();

            builder.Property(c => c.DisplayName)
                .IsRequired();

            builder.HasOne(c => c.Municipality)
                .WithMany(m => m.Cities)
                .HasForeignKey(c => c.MunicipalityId);
        }
    }
}
