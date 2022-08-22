using ConstructionCompany.Common.DTOs.ClientDto;
using Microsoft.AspNetCore.Mvc;

namespace ConstructionCompany.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientRepository _clientRepository;
        public ClientsController(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await _clientRepository.GetAllAsync(withDisabled: false);
            
            return Ok(data.Select(x=>x.AsDto()));
        }

        [HttpGet("[action]/{clientId}")]
        public async Task<IActionResult> GetSingle(string clientId)
        {
            var data = await _clientRepository.GetSingle(clientId);
            var dataDTO = data.AsDto();
            return Ok(dataDTO);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddClientDto newClient)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var client = await _clientRepository.Add(newClient);

            if (newClient.ReturnAsOption)
            {
                return CreatedAtRoute(routeName: "",
                    routeValues: new { clientId = client.ClientId },
                    value: client.AsOption());
            }

            return CreatedAtRoute(routeName: "", 
                routeValues: new { clientId = client.ClientId }, 
                value: client.AsDto());
        }

        [HttpDelete("{clientId}")]
        public async Task<IActionResult> Delete(string clientId)
        {
            await _clientRepository.Disable(clientId);
            return NoContent();
        }
    }
}
