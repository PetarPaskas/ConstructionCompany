using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public record StrippedNoteModel
    {
        public int NoteId { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
