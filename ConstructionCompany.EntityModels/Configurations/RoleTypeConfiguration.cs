using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class RoleTypeConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builer)
        {
            builer.ToTable("Roles");

            builer.HasKey(r => r.RoleId);

            builer.HasAlternateKey(r => r.RoleCode);

            builer.Property(r => r.RoleCode)
                .IsRequired();

            builer.Property(r => r.DisplayName)
                .IsRequired();
        }
    }
}
