using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class ProfessionTypeConfiguration : IEntityTypeConfiguration<Profession>
    {
        public void Configure(EntityTypeBuilder<Profession> builder)
        {
            builder.ToTable("Professions");

            builder.HasKey(p => p.ProfessionId);

            builder.HasAlternateKey(p => p.ProfessionCode);

            builder.Property(p => p.ProfessionCode)
                .IsRequired();

            builder.Property(p => p.DisplayName)
                .IsRequired();

        }
    }
}
