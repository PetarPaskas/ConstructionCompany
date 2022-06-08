using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Interfaces
{
    public interface INoteRepository : IRepository<Note>
    {
        Task<IEnumerable<Note>> GetAllNotesWithNavPropertiesAsync();
        Task<Note> GetNoteWithNavPropertiesAsync(int noteId);
        Task<bool> DeleteNoteAsync(int noteId);
        Task<Note> AddNoteAsync(Note note);
        Task<Note> UpdateNoteAsync(int noteId, Note note);
    }
}
