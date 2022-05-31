using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class EarlyPaymentRepository : Repository<EarlyPayment>, IEarlyPaymentRepository
    {
        public EarlyPaymentRepository(ConstructionCompanyContext context)
        : base(context)
        {

        }
    }
}
