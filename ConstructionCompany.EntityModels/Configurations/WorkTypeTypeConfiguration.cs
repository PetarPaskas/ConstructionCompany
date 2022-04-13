using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class WorkTypeTypeConfiguration : IEntityTypeConfiguration<WorkType>
    {
        public void Configure(EntityTypeBuilder<WorkType> builder)
        {
            builder.ToTable("WorkTypes");

            builder.HasKey(wt => wt.WorkTypeId);

            builder.HasAlternateKey(wt => wt.WorkTypeCode);

            builder.Property(wt => wt.WorkTypeCode)
                .IsRequired();

            builder.Property(wt => wt.DisplayName)
                .IsRequired();
        } 
    }
}
