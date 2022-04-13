using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class CurrencyTypeConfiguration : IEntityTypeConfiguration<Currency>
    {
        public void Configure(EntityTypeBuilder<Currency> builder)
        {
            builder.ToTable("Currencies");

            builder.HasKey( c=> c.CurrencyId);

            builder.HasAlternateKey(c => c.CurrencyCode);

            builder.Property(c => c.DisplayName)
                .IsRequired();

        }
    }
}
