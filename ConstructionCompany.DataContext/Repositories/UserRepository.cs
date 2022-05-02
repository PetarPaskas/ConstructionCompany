using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class UserRepository :Repository<User>, IUserRepository
    {
        public UserRepository(ConstructionCompanyContext context)
            :base(context)
        {

        }
    }
}
