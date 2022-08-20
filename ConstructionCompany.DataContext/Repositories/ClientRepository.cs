using ConstructionCompany.Common.DTOs.ClientDto;
using System;
using System.Collections.Generic;


namespace ConstructionCompany.DataContext.Repositories
{
    public class ClientRepository : Repository<Client>, IClientRepository
    {
        private ConstructionCompanyContext _constructionCompanyContext;
        public ClientRepository(ConstructionCompanyContext context)
        : base((DbContext)context)
        {
            _constructionCompanyContext = context;
        }

        public async Task<Client> Add(AddClientDto newClient)
        {
            Guid id = Guid.NewGuid();
            var client = new Client()
                        {
                            ClientId = id.ToString(),
                            ClientAddress = newClient.ClientAddress,
                            ClientName = newClient.ClientName,
                            IsDisabled = false,
                            ConstructionSites = null
                        };

            await _constructionCompanyContext.Clients.AddAsync(client);
            await _constructionCompanyContext.SaveChangesAsync();

            await _constructionCompanyContext.ConstructionSites.Include(cs => cs.City).LoadAsync();

            return client;
        }

        public async Task<bool> Disable(string clientId)
        {
            Client client = await _constructionCompanyContext.Clients.FindAsync(clientId);
            client.IsDisabled = true;
            await _constructionCompanyContext.SaveChangesAsync();
            return true;
        }

        public async Task<Client> GetSingle(string clientId)
        {
            return await _constructionCompanyContext.Clients
                .Include(c => c.ConstructionSites)
                .Include(c => c.ConstructionSites.Select(c => c.City))
                .SingleOrDefaultAsync(c => c.ClientId == clientId);

        }

        public async Task<IEnumerable<Client>> GetAllAsync()
        {
            return await _constructionCompanyContext.Clients
                .Include(c => c.ConstructionSites)
                .ThenInclude(cs=>cs.City)
                .ToListAsync();
        }

        public async Task<IEnumerable<Client>> GetAllAsync(bool withDisabled)
        {
            if(withDisabled)
            return await GetAllAsync();

            return await _constructionCompanyContext.Clients.Where(c => c.IsDisabled == true)
                .Include(c=>c.ConstructionSites)
                .ThenInclude(cs=>cs.City)
                .ToListAsync();
        }

        public async Task<IEnumerable<Client>> GetAllForOptions()
        {
            return await _constructionCompanyContext.Clients.ToListAsync();
        }
    }
}
