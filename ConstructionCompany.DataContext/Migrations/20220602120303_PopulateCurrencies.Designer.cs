﻿// <auto-generated />
using System;
using ConstructionCompany.DataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ConstructionCompany.DataContext.Migrations
{
    [DbContext(typeof(ConstructionCompanyContext))]
    [Migration("20220602120303_PopulateCurrencies")]
    partial class PopulateCurrencies
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("ClientConstructionSite", b =>
                {
                    b.Property<string>("ClientsClientId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("ConstructionSitesConstructionSiteId")
                        .HasColumnType("int");

                    b.HasKey("ClientsClientId", "ConstructionSitesConstructionSiteId");

                    b.HasIndex("ConstructionSitesConstructionSiteId");

                    b.ToTable("ClientConstructionSite");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.City", b =>
                {
                    b.Property<int>("CityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CityId"), 1L, 1);

                    b.Property<int>("CityCode")
                        .HasColumnType("int");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MunicipalityId")
                        .HasColumnType("int");

                    b.HasKey("CityId");

                    b.HasAlternateKey("CityCode");

                    b.HasIndex("MunicipalityId");

                    b.ToTable("Cities", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Client", b =>
                {
                    b.Property<string>("ClientId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ClientAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClientName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ClientId");

                    b.ToTable("Clients", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.ConstructionSite", b =>
                {
                    b.Property<int>("ConstructionSiteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ConstructionSiteId"), 1L, 1);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CityId")
                        .HasColumnType("int");

                    b.Property<string>("ClientId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateFinished")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateStarted")
                        .HasColumnType("datetime2");

                    b.Property<string>("DisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsFinished")
                        .HasColumnType("bit");

                    b.HasKey("ConstructionSiteId");

                    b.HasIndex("CityId");

                    b.ToTable("ConstructionSites", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Currency", b =>
                {
                    b.Property<int>("CurrencyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CurrencyId"), 1L, 1);

                    b.Property<int>("CurrencyCode")
                        .HasColumnType("int");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CurrencyId");

                    b.HasAlternateKey("CurrencyCode");

                    b.ToTable("Currencies", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.EarlyPayment", b =>
                {
                    b.Property<int>("EarlyPaymentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EarlyPaymentId"), 1L, 1);

                    b.Property<DateTime>("BorrowEndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("BorrowReturnDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("BorrowStartDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GETDATE()");

                    b.Property<bool>("IsResolved")
                        .HasColumnType("bit");

                    b.Property<int>("NoteId")
                        .HasColumnType("int");

                    b.Property<int>("PaymentTypeId")
                        .HasColumnType("int");

                    b.Property<decimal>("Sum")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("EarlyPaymentId");

                    b.HasIndex("NoteId");

                    b.HasIndex("PaymentTypeId");

                    b.HasIndex("UserId");

                    b.ToTable("EarlyPayments", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Municipality", b =>
                {
                    b.Property<int>("MunicipalityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MunicipalityId"), 1L, 1);

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MunicipalityCode")
                        .HasColumnType("int");

                    b.HasKey("MunicipalityId");

                    b.HasAlternateKey("MunicipalityCode");

                    b.ToTable("Municipalities", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Note", b =>
                {
                    b.Property<int>("NoteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("NoteId"), 1L, 1);

                    b.Property<int>("ConstructionSiteId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateCreated")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GETDATE()");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("NoteId");

                    b.HasAlternateKey("ConstructionSiteId", "Title");

                    b.HasIndex("UserId");

                    b.ToTable("Notes", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.PaymentType", b =>
                {
                    b.Property<int>("PaymentTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PaymentTypeId"), 1L, 1);

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PaymentTypeCode")
                        .HasColumnType("int");

                    b.HasKey("PaymentTypeId");

                    b.HasAlternateKey("PaymentTypeCode");

                    b.ToTable("PaymentTypes", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Profession", b =>
                {
                    b.Property<int>("ProfessionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProfessionId"), 1L, 1);

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfessionCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("ProfessionId");

                    b.HasAlternateKey("ProfessionCode");

                    b.ToTable("Professions", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RoleId"), 1L, 1);

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("RoleId");

                    b.HasAlternateKey("RoleCode");

                    b.ToTable("Roles", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"), 1L, 1);

                    b.Property<int>("CurrencyId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("EmploymentEndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("EmploymentStartDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GETDATE()");

                    b.Property<double>("HourlyRate")
                        .HasColumnType("float");

                    b.Property<bool>("IsDisabled")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValueSql("0");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nickname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProfessionId")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("ProfessionId");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.UserRole", b =>
                {
                    b.Property<int>("UserRoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserRoleId"), 1L, 1);

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("UserRoleId");

                    b.HasAlternateKey("RoleId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRoles", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Wage", b =>
                {
                    b.Property<int>("WageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WageId"), 1L, 1);

                    b.Property<int>("ConstructionSiteId")
                        .HasColumnType("int");

                    b.Property<int>("HoursDone")
                        .HasColumnType("int");

                    b.Property<int>("HoursRequired")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValue(8);

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("WorkDay")
                        .HasColumnType("datetime2");

                    b.HasKey("WageId");

                    b.HasIndex("ConstructionSiteId");

                    b.HasIndex("UserId");

                    b.ToTable("Wages", (string)null);
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.WorkType", b =>
                {
                    b.Property<int>("WorkTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WorkTypeId"), 1L, 1);

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("WorkTypeCode")
                        .HasColumnType("int");

                    b.HasKey("WorkTypeId");

                    b.HasAlternateKey("WorkTypeCode");

                    b.ToTable("WorkTypes", (string)null);
                });

            modelBuilder.Entity("ClientConstructionSite", b =>
                {
                    b.HasOne("ConstructionCompany.EntityModels.Client", null)
                        .WithMany()
                        .HasForeignKey("ClientsClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConstructionCompany.EntityModels.ConstructionSite", null)
                        .WithMany()
                        .HasForeignKey("ConstructionSitesConstructionSiteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.City", b =>
                {
                    b.HasOne("ConstructionCompany.EntityModels.Municipality", "Municipality")
                        .WithMany("Cities")
                        .HasForeignKey("MunicipalityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Municipality");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.ConstructionSite", b =>
                {
                    b.HasOne("ConstructionCompany.EntityModels.City", "City")
                        .WithMany("ConstructionSites")
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("City");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.EarlyPayment", b =>
                {
                    b.HasOne("ConstructionCompany.EntityModels.Note", "Note")
                        .WithMany()
                        .HasForeignKey("NoteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConstructionCompany.EntityModels.PaymentType", "PaymentType")
                        .WithMany()
                        .HasForeignKey("PaymentTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConstructionCompany.EntityModels.User", "User")
                        .WithMany("EarlyPayments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Note");

                    b.Navigation("PaymentType");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Note", b =>
                {
                    b.HasOne("ConstructionCompany.EntityModels.ConstructionSite", "ConstructionSite")
                        .WithMany("Notes")
                        .HasForeignKey("ConstructionSiteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConstructionCompany.EntityModels.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ConstructionSite");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.User", b =>
                {
                    b.HasOne("ConstructionCompany.EntityModels.Currency", "Currency")
                        .WithMany("Users")
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConstructionCompany.EntityModels.Profession", "Profession")
                        .WithMany("Users")
                        .HasForeignKey("ProfessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Currency");

                    b.Navigation("Profession");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.UserRole", b =>
                {
                    b.HasOne("ConstructionCompany.EntityModels.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConstructionCompany.EntityModels.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Wage", b =>
                {
                    b.HasOne("ConstructionCompany.EntityModels.ConstructionSite", "ConstructionSite")
                        .WithMany("Wages")
                        .HasForeignKey("ConstructionSiteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConstructionCompany.EntityModels.User", "User")
                        .WithMany("Wages")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ConstructionSite");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.City", b =>
                {
                    b.Navigation("ConstructionSites");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.ConstructionSite", b =>
                {
                    b.Navigation("Notes");

                    b.Navigation("Wages");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Currency", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Municipality", b =>
                {
                    b.Navigation("Cities");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Profession", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.Role", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("ConstructionCompany.EntityModels.User", b =>
                {
                    b.Navigation("EarlyPayments");

                    b.Navigation("UserRoles");

                    b.Navigation("Wages");
                });
#pragma warning restore 612, 618
        }
    }
}
