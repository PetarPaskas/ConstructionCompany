﻿using ConstructionCompany.Common.DTOs;
using ConstructionCompany.Common.DTOs.CityDto;
using ConstructionCompany.Common.DTOs.ProfessionDto;
using ConstructionCompany.DataContext.Interfaces;
using ConstructionCompany.EntityModels;
using Microsoft.AspNetCore.Mvc;

namespace ConstructionCompany.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MiscController : ControllerBase
    {
        private readonly IConstructionSiteRepository _constructionSiteRepository;
        private readonly IProfessionRepository _professionRepository;
        private readonly ICityRepository _cityRepository;
        public MiscController(
            IProfessionRepository profRepo, 
            ICityRepository cityRepo, 
            IConstructionSiteRepository constRepo)
        {
            _professionRepository = profRepo;
            _cityRepository = cityRepo;
            _constructionSiteRepository = constRepo;
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

            GetOptionsDto options = new(citiesDb, professionsDb, constructionSitesDb);

            return Ok(options);
        }
    }
}
