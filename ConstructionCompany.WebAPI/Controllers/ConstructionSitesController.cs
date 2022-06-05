using ConstructionCompany.Common.DTOs.ConstructionSiteDto;
using ConstructionCompany.DataContext.Interfaces;
using ConstructionCompany.EntityModels;
using Microsoft.AspNetCore.Mvc;

namespace ConstructionCompany.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConstructionSitesController : ControllerBase
    {
        private readonly IConstructionSiteRepository _constructionSiteRepository;
        public ConstructionSitesController(IConstructionSiteRepository constructionSiteRepository)
        {
            _constructionSiteRepository = constructionSiteRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<ConstructionSite> sites = await _constructionSiteRepository.GetAllWithNavPropertiesAsync();

            IEnumerable<GetConstructionSiteDto> data = sites.Select(cs => cs.AsDto());

            return Ok(data);
        }

        [HttpGet("{constructionSiteId}")]
        public async Task<IActionResult> GetSingleConstructionSite(int constructionSiteId)
        {
            ConstructionSite cs = await _constructionSiteRepository.GetSingleWithNavPropertiesAsync(constructionSiteId);

           return Ok(cs.AsDto());

        }

        [HttpDelete("{constructionSiteId}")]
        public async Task<IActionResult> DeleteConstructionSite(int constructionSiteId)
        {
           await _constructionSiteRepository.DisableConstructionSiteAsync(constructionSiteId);

            return NoContent();
        }

        [HttpPatch("[action]/{constructionSiteId}")]
        public async Task<IActionResult> EnableConstructionSite(int constructionSiteId)
        {
            await _constructionSiteRepository.EnableConstructionSiteAsync(constructionSiteId);

            return NoContent();
        }

        [HttpPatch("{constructionSiteId}")]
        public async Task<IActionResult> UpdateConstructionSite(int constructionSiteId, AddEditConstructionSiteDto constructionSiteDto)
        {
           ConstructionSite newConstructionSite = await _constructionSiteRepository.UpdateConstructionSiteAsync(constructionSiteId, constructionSiteDto);

            return Ok(newConstructionSite.AsDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateConstructionSite([FromBody] AddEditConstructionSiteDto constructionSiteDto)
        {
            var cs = await _constructionSiteRepository.AddConstructionSiteAsync(constructionSiteDto);
            return CreatedAtRoute(
                routeName: $"api/constructionsites",
                routeValues: new { ConstructionSiteId = cs.ConstructionSiteId } ,
                cs.AsDto());
        }
    }
}
