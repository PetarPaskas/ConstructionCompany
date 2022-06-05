using ConstructionCompany.Common;
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
        public async Task<IActionResult> UpdateNote(int noteId, [FromBody] AddEditNoteDto newNote)
        {
            Note updatedNote = await _notesRepository.UpdateNoteAsync(noteId, newNote.AsNote());

            return Ok(updatedNote.AsDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] AddEditNoteDto newNote)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ClientErrorMessage("Incorrect data format"));

            Note note = await _notesRepository.AddNoteAsync(newNote.AsNote());

            return CreatedAtRoute(
                routeName: "api/notes", 
                routeValues: new { noteId = note.NoteId}, 
                value: note.AsDto());
        }
    }
}
