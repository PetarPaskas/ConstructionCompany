using ConstructionCompany.Common.DTOs.CityDto;
using ConstructionCompany.Common.DTOs.ProfessionDto;
using ConstructionCompany.Common.DTOs.ConstructionSiteDto;
using ConstructionCompany.EntityModels;
using ConstructionCompany.Common.DTOs.CurrencyDto;

namespace ConstructionCompany.Common.DTOs
{
    public record GetOptionsDto
    {
        public IEnumerable<Option> CitiesOptions { get; set; }

        public IEnumerable<Option> ProfessionOptions { get; set; }

        public IEnumerable<Option> ConstructionSiteOptions { get; set; }

        public IEnumerable<Option> CurrencyOptions { get; set; }

        public GetOptionsDto(
            IEnumerable<City> cities, 
            IEnumerable<Profession> professions, 
            IEnumerable<ConstructionSite> constructionSites,
            IEnumerable<Currency> currencies)
        {
            CitiesOptions = cities.Select(c => c.AsOption());
            ProfessionOptions = professions.Select(p => p.AsOption());
            ConstructionSiteOptions = constructionSites.Select(cs => cs.AsOption());
            CurrencyOptions = currencies.Select(c => c.AsOption());
        }
    }
}
