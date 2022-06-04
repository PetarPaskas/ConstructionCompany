using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class NoteRepository : Repository<Note>, INoteRepository
    {
        private ConstructionCompanyContext _context;

        public NoteRepository(ConstructionCompanyContext context)
            :base(context)
        {
            _context = context;
        }

        public async Task<bool> DeleteNoteAsync(int noteId)
        {
            Note note = await _context.Notes.FindAsync(noteId);

            _context.Notes.Remove(note);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<Note>> GetAllNotesWithNavPropertiesAsync()
        {
            IEnumerable<Note> notes = await _context.Notes
                                                .Include(n => n.User)
                                                .Include(n => n.ConstructionSite)
                                                .ToListAsync();

            return notes;
        }

        public async Task<Note> GetNoteWithNavPropertiesAsync(int noteId)
        {
            Note note = await _context.Notes
                                    .Include(n => n.User)
                                    .Include(n => n.ConstructionSite)
                                    .SingleAsync(n => n.NoteId == noteId);

            return note;
        }
    }
}
