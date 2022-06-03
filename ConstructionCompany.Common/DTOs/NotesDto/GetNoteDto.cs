using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.NotesDto
{
    public record GetNoteDto
    {
        public int NoteId { get; set; }
        public DateTime DateCreated { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public StrippedConstructionSiteModel ConstructionSite { get; set; }
        public StrippedUserModel User { get; set; }
    }
}
