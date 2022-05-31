using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class PaymentTypeTypeConfiguration : IEntityTypeConfiguration<PaymentType>
    {
        public void Configure(EntityTypeBuilder<PaymentType> builder)
        {
            builder.ToTable("PaymentTypes");

            builder.HasKey(pt => pt.PaymentTypeId);

            builder.HasAlternateKey(pt => pt.PaymentTypeCode);

            builder.Property(pt => pt.PaymentTypeCode)
                .IsRequired();

            builder.Property(pt => pt.DisplayName)
                .IsRequired();
        }
    }
}
