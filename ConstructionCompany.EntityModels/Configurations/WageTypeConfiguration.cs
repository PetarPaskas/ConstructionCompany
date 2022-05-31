using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class WageTypeConfiguration : IEntityTypeConfiguration<Wage>
    {
        public void Configure(EntityTypeBuilder<Wage> builder)
        {
            builder.ToTable("Wages");

            builder.HasKey(w => w.WageId);

            builder.HasOne(w=>w.User)
                .WithMany(u=>u.Wages)
                .HasForeignKey(u=>u.UserId);

            builder.HasOne(w => w.ConstructionSite)
                .WithMany(cs => cs.Wages)
                .HasForeignKey(w => w.ConstructionSiteId);

            builder.Property(w => w.HoursDone)
                .IsRequired();

            builder.Property(w => w.HoursRequired)
                .HasDefaultValue(8)
                .IsRequired();

            builder.Property(w => w.WorkDay)
                .HasColumnType("datetime")
                .HasConversion<DateOnly>()
                .IsRequired();
        }
    }
}
