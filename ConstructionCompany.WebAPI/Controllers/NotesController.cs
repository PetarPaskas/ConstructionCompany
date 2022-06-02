using Microsoft.AspNetCore.Mvc;

namespace ConstructionCompany.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        public NotesController()
        {

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingleNote(int noteId)
        {
            return Ok();

        }

        [HttpDelete]
        public async Task<IActionResult> DeleteNote(int noteId)
        {
            return Ok();
        }

        [HttpPatch("{noteId}")]
        public async Task<IActionResult> UpdateNote(int noteId, object newNote)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] object note)
        {
            return CreatedAtRoute(null, null);
        }
    }
}
