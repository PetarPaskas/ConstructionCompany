using ConstructionCompany.Common;
using ConstructionCompany.Common.DTOs.UserDto;
using ConstructionCompany.DataContext.Interfaces;
using ConstructionCompany.EntityModels;
using Microsoft.AspNetCore.Mvc;

namespace ConstructionCompany.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController:ControllerBase
    {
        private IUserRepository _usersRepository;
        public UsersController(IUserRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpGet("[action]/{constructionSiteId}")]
        public async Task<IActionResult> GetUsersForConstructionSite(int constructionSiteId)
        {
            IEnumerable<User> usersDb = await _usersRepository.GetAllUsersForConstructionSite(constructionSiteId);

            IEnumerable<GetUsersDto> users = usersDb.Select(u => u.AsDto());

            return Ok(users);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllusers()
        {
            IEnumerable<User> usersDb = await _usersRepository.GetAllWithNavProperties();

            IEnumerable<GetUsersDto> users = usersDb.Select(user => user.AsDto());

            return Ok(users);
        }

        [HttpGet("[action]/{date}")]
        public async Task<IActionResult> GetAllUsersForDate(DateTime? date)
        {
            if(!date.HasValue)
                return BadRequest(new ClientErrorMessage("Izaberi datum"));

            IEnumerable<User> usersDb = await _usersRepository.GetUsersWithProfessionAndConstructionSiteForDateAsync(date.Value);

            IEnumerable<GetUsersDto> users = usersDb.Select(user => user.AsDtoWithConstructionSite(date.Value));

            return Ok(users);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            User user = await _usersRepository.GetUserWithNavProperties(userId);

            return Ok(user.AsDtoWithWages());
        }

        [HttpPatch("{userId}")]
        public async Task<IActionResult> UpdateUser(int userId, [FromBody] object newUser)
        {
            return Ok("IMPLEMENT THIS");
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            await _usersRepository.DisableUser(userId);

            return NoContent();
        }

        [HttpGet("[action]/{userId}")]
        public async Task<IActionResult> EnableUser(int userId)
        {
            await _usersRepository.EnableUser(userId);

            return NoContent();
        }


        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] object user)
        {
            return Ok("IMPLEMENT THIS");

          //return CreatedAtRoute(null, null);
        }

    }
}
