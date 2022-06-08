using ConstructionCompany.Common.DTOs;
using ConstructionCompany.Common.DTOs.CityDto;
using ConstructionCompany.Common.DTOs.ProfessionDto;
using ConstructionCompany.DataContext.Interfaces;
using ConstructionCompany.EntityModels;
using Microsoft.AspNetCore.Mvc;

namespace ConstructionCompany.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MiscController : ControllerBase
    {
        private readonly IConstructionSiteRepository _constructionSiteRepository;
        private readonly IProfessionRepository _professionRepository;
        private readonly ICityRepository _cityRepository;
        private readonly ICurrencyRepository _currencyRepository;
        public MiscController(
            IProfessionRepository profRepo, 
            ICityRepository cityRepo, 
            IConstructionSiteRepository constRepo,
            ICurrencyRepository currencyRepo)
        {
            _professionRepository = profRepo;
            _cityRepository = cityRepo;
            _constructionSiteRepository = constRepo;
            _currencyRepository = currencyRepo;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Professions()
        {
           IEnumerable<Profession> professionsDb = await _professionRepository.GetAllProfessionsAsync();

            IEnumerable<GetProfessionDto> data = professionsDb.Select(p => p.AsDto());

            return Ok(data);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Cities()
        {
            IEnumerable<City> citiesDb = await _cityRepository.GetAllCitiesWithNavPropAsync();

            IEnumerable<GetCityDto> data = citiesDb.Select(p => p.AsDto());

            return Ok(data);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllOptions()
        {
            IEnumerable<City> citiesDb = await _cityRepository.GetAllCitiesWithNavPropAsync();
            IEnumerable<Profession> professionsDb = await _professionRepository.GetAllProfessionsAsync();
            IEnumerable<ConstructionSite> constructionSitesDb = await _constructionSiteRepository.GetallForOptions();
            IEnumerable<Currency> currenciesDb = await _currencyRepository.GetAllForOptions();

            GetOptionsDto options = new(citiesDb, professionsDb, constructionSitesDb, currenciesDb);

            return Ok(options);
        }
    }
}
