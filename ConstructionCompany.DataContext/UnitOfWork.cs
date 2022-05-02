using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext
{
    public class UnitOfWork : IUnitOfWork
    {
        public ICityRepository Cities { get; set; }
        public IClientRepository Clients { get; set; }
        public IConstructionSiteRepository ConstructionSites { get; set; }
        public ICurrencyRepository Currencies { get; set; }
        public IEarlyPaymentRepository EarlyPayments { get; set; }
        public IMunicipalityRepository Municipalities { get; set; }
        public INoteRepository Notes { get; set; }
        public IPaymentTypeRepository PaymentTypes { get; set; }
        public IProfessionRepository Professions { get; set; }
        public IRoleRepository Roles { get; set; }
        public IUserRepository Users { get; set; }
        public IUserRoleRepository UserRoles { get; set; }
        public IWageRepository Wages { get; set; }
        public IWorkTypeRepository WorkTypes { get; set; }
    }
}
