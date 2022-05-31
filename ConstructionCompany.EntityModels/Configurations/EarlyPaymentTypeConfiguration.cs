using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class EarlyPaymentTypeConfiguration : IEntityTypeConfiguration<EarlyPayment>
    {
        public void Configure(EntityTypeBuilder<EarlyPayment> builder)
        {
            builder.ToTable("EarlyPayments");

            builder.HasKey(ep => ep.EarlyPaymentId);

            builder.HasOne(ep => ep.User)
                .WithMany(u => u.EarlyPayments)
                .HasForeignKey(ep => ep.UserId);

            builder.Property(ep => ep.Sum)
                .HasConversion<decimal>()
                .IsRequired();

            builder.Property(ep => ep.BorrowStartDate)
                .HasConversion<DateOnly>()
                .HasColumnType("datetime")
                .HasDefaultValueSql("GETDATE()")
                .IsRequired();
        }
    }
}
