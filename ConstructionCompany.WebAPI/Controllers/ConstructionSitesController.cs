using Microsoft.AspNetCore.Mvc;

namespace ConstructionCompany.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConstructionSitesController : ControllerBase
    {
        public ConstructionSitesController()
        {

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok();
        }

        [HttpGet("{constructionSiteId}")]
        public async Task<IActionResult> GetSingleConstructionSite(int constructionSiteId)
        {
            return Ok();

        }

        [HttpDelete("{constructionSiteId}")]
        public async Task<IActionResult> DeleteConstructionSite(int constructionSiteId)
        {
            return Ok();
        }

        [HttpPatch("{constructionSiteId}")]
        public async Task<IActionResult> UpdateConstructionSite(int constructionSiteId, object newConstructionSite)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateConstructionSite([FromBody] object constructionSite)
        {
            return CreatedAtRoute(null, null);
        }
    }
}
