using ConstructionCompany.Common.DTOs.WagesDto;
using ConstructionCompany.DataContext.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConstructionCompany.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WagesController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConstructionSiteRepository _constructionSiteRepository;
        private readonly IWageRepository _wageRepository;
        public WagesController
            (
            IUserRepository userRepository,
            IConstructionSiteRepository constructionSiteRepository,
            IWageRepository wageRepository
            )
        {
            _userRepository = userRepository;
            _constructionSiteRepository = constructionSiteRepository;
            _wageRepository = wageRepository;
        }

        [HttpPut]
        public async Task<IActionResult> RegisterWage([FromBody] IEnumerable<PutWagesDto> newWages)
        {
            return Ok();
        }
    }
}
