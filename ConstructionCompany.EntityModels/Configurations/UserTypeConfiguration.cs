using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class UserTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(u => u.UserId);

            builder.HasOne(u=>u.Profession)
                .WithMany(p=>p.Users)
                .HasForeignKey(u=>u.ProfessionId);

            builder.HasOne(u => u.Currency)
                .WithMany(p => p.Users)
                .HasForeignKey(u => u.CurrencyId);

            builder.Ignore(u => u.FullName);

            builder.Property(u => u.Username)
                .IsRequired();

            builder.Property(u => u.Name)
                .IsRequired();

            builder.Property(u => u.PhoneNumber)
                .IsRequired();

            builder.Property(u => u.Surname)
                .IsRequired();

            builder.Property(u => u.IsDisabled)
                .HasDefaultValueSql("0")
                .IsRequired();

            builder.Property(u => u.EmploymentStartDate)
                .HasDefaultValueSql("GETDATE()")
                .IsRequired();

            builder.Property(u => u.Password)
                .IsRequired();

            builder.Property(u => u.HourlyRate)
                .IsRequired();

            builder.Property(u => u.CurrencyId)
                .IsRequired();

        }
    }
}
