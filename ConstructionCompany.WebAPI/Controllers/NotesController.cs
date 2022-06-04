using ConstructionCompany.Common.DTOs.NoteDto;
using ConstructionCompany.DataContext.Interfaces;
using ConstructionCompany.EntityModels;
using Microsoft.AspNetCore.Mvc;

namespace ConstructionCompany.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly INoteRepository _notesRepository;
        public NotesController(INoteRepository notesRepository)
        {
            _notesRepository = notesRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<Note> notesDb = await _notesRepository.GetAllNotesWithNavPropertiesAsync();

            IEnumerable<GetNoteDto> notes = notesDb.Select(n => n.AsDto());

            return Ok(notes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingleNote(int noteId)
        {
            Note noteDb = await _notesRepository.GetNoteWithNavPropertiesAsync(noteId);

            return Ok(noteDb.AsDto());

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int noteId)
        {
            bool result = await _notesRepository.DeleteNoteAsync(noteId);

            if (result)
                return NoContent();
            else
                return BadRequest();
        }

        [HttpPatch("{noteId}")]
        public async Task<IActionResult> UpdateNote(int noteId, [FromBody] object newNote)
        {
            return BadRequest("IMPLEMENT THIS");
           // return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] object note)
        {
            return BadRequest("IMPLEMENT THIS");
            //return CreatedAtRoute(null, null);
        }
    }
}
