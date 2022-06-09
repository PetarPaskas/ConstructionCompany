using ConstructionCompany.Common.DTOs.CityDto;
using ConstructionCompany.Common.DTOs.ProfessionDto;
using ConstructionCompany.Common.DTOs.ConstructionSiteDto;
using ConstructionCompany.EntityModels;
using ConstructionCompany.Common.DTOs.CurrencyDto;
using ConstructionCompany.Common.DTOs.ClientDto;

namespace ConstructionCompany.Common.DTOs
{
    public record GetOptionsDto
    {
        public IEnumerable<Option> CitiesOptions { get; set; }

        public IEnumerable<Option> ProfessionOptions { get; set; }

        public IEnumerable<Option> ConstructionSiteOptions { get; set; }

        public IEnumerable<Option> CurrencyOptions { get; set; }

        public IEnumerable<Option> ClientOptions { get; set; }

        public GetOptionsDto(
            IEnumerable<City> cities, 
            IEnumerable<Profession> professions, 
            IEnumerable<ConstructionSite> constructionSites,
            IEnumerable<Currency> currencies,
            IEnumerable<Client> clients)
        {
            CitiesOptions = cities.Select(c => c.AsOption());
            ProfessionOptions = professions.Select(p => p.AsOption());
            ConstructionSiteOptions = constructionSites.Select(cs => cs.AsOption());
            CurrencyOptions = currencies.Select(c => c.AsOption());
            ClientOptions = clients.Select(c => c.AsOption());

        }
    }
}
