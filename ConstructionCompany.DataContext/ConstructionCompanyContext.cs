using ConstructionCompany.EntityModels.Globals;

namespace ConstructionCompany.DataContext
{
    public class ConstructionCompanyContext : DbContext
    {
        public DbSet<City> Cities { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<ConstructionSite> ConstructionSites { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<EarlyPayment> EarlyPayments { get; set; }
        public DbSet<Municipality> Municipalities { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<PaymentType> PaymentTypes { get; set; }
        public DbSet<Profession> Professions { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Wage> Wages { get; set; }
        public DbSet<WorkType> WorkTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            builder.ApplyConstructionCompanyEntityTypeConfigurations();
        }

    }
}
