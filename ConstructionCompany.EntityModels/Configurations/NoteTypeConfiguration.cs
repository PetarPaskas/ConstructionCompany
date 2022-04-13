using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class NoteTypeConfiguration : IEntityTypeConfiguration<Note>
    {
        public void Configure(EntityTypeBuilder<Note> builder)
        {
            builder.ToTable("Notes");

            builder.HasKey(n => n.NoteId);

            builder.HasOne(n => n.ConstructionSite)
                .WithMany(cs => cs.Notes)
                .HasForeignKey(n => n.ConstructionSiteId);

            builder.Property(n => n.DateCreated)
                .HasDefaultValueSql("GETDATE()")
                .IsRequired();

            builder.Property(n => n.Description)
                .IsRequired();

        }
    }
}
