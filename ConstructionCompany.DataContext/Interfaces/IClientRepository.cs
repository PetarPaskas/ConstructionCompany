using ConstructionCompany.Common.DTOs.ClientDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Interfaces
{
    public interface IClientRepository : IRepository<Client>
    {
        Task<IEnumerable<Client>> GetAllForOptions();
        Task<IEnumerable<Client>> GetAllAsync();
        Task<IEnumerable<Client>> GetAllAsync(bool withDisabled);
        Task<bool> Disable(string clientId);
        Task<Client> Add(AddClientDto newClient);
        Task<Client> GetSingle(string clientId);

    }
}
