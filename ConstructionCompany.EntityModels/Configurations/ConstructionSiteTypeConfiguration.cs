﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels.Configurations
{
    public class ConstructionSiteTypeConfiguration : IEntityTypeConfiguration<ConstructionSite>
    {
        public void Configure(EntityTypeBuilder<ConstructionSite> builder)
        {
            builder.ToTable("ConstructionSites");

            builder.HasKey(cs => cs.ConstructionSiteId);

            builder.Property(cs => cs.Address)
                .IsRequired();

            builder.HasOne(cs => cs.City)
                .WithMany(c => c.ConstructionSites)
                .HasForeignKey(cs => cs.CityId);

        }
    }
}