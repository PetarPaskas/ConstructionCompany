using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class NoteRepository : Repository<Note>, INoteRepository
    {
        private ConstructionCompanyContext _constructionCompanyContext;

        public NoteRepository(ConstructionCompanyContext context)
            :base(context)
        {
            _constructionCompanyContext = context;
        }

        public async Task<bool> DeleteNoteAsync(int noteId)
        {
            Note note = await _constructionCompanyContext.Notes.FindAsync(noteId);

            _constructionCompanyContext.Notes.Remove(note);

            await _constructionCompanyContext.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<Note>> GetAllNotesWithNavPropertiesAsync()
        {
            IEnumerable<Note> notes = await _constructionCompanyContext.Notes
                                                .Include(n => n.User)
                                                .Include(n => n.ConstructionSite)
                                                .ToListAsync();

            return notes;
        }

        public async Task<Note> GetNoteWithNavPropertiesAsync(int noteId)
        {
            Note note = await _constructionCompanyContext.Notes
                                    .Include(n => n.User)
                                    .Include(n => n.ConstructionSite)
                                    .SingleOrDefaultAsync(n => n.NoteId == noteId);

            return note;
        }

        public async Task<Note> UpdateNoteAsync(int noteId, Note note)
        {
            var noteDb = await _constructionCompanyContext.Notes.FindAsync(noteId);

            noteDb.Description = note.Description;
            noteDb.Title = note.Title;
            noteDb.ConstructionSiteId = note.ConstructionSiteId;
            noteDb.UserId = note.UserId;

            await _constructionCompanyContext.SaveChangesAsync();

            await _constructionCompanyContext.ConstructionSites.SingleOrDefaultAsync(cs => cs.ConstructionSiteId == note.ConstructionSiteId);
            if (note.UserId.HasValue)
            {
                await _constructionCompanyContext.Users.SingleOrDefaultAsync(u => u.UserId == note.UserId.Value);
            }

            return noteDb;
        }

        public async Task<Note> AddNoteAsync(Note note)
        {
            await _constructionCompanyContext.Notes.AddAsync(note);
            await _constructionCompanyContext.SaveChangesAsync();
            await _constructionCompanyContext.ConstructionSites.SingleOrDefaultAsync(cs => cs.ConstructionSiteId == note.ConstructionSiteId);

            if (note.UserId.HasValue)
            {
                await _constructionCompanyContext.Users.SingleOrDefaultAsync(u => u.UserId == note.UserId.Value);
            }

            return note;
        }
    }
}
