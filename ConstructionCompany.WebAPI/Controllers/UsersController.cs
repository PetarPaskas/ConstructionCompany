using ConstructionCompany.DataContext.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ConstructionCompany.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController:ControllerBase
    {
        private IWorkTypeRepository _workTypeRepository;
        public UsersController(IWorkTypeRepository workType)
        {
            _workTypeRepository = workType;
        }

        [HttpGet("[action]/{constructionSiteId}")]
        public async Task<IActionResult> GetUsersForConstructionSite(int constructionSiteId)
        {
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok();
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            return Ok();
        }

        [HttpPatch("{userId}")]
        public async Task<IActionResult> UpdateUser(int userId, [FromBody] object newUser)
        {
            return Ok();
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            return Ok();

        }


        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] object user)
        {
            return CreatedAtRoute(null, null);
        }

    }
}
