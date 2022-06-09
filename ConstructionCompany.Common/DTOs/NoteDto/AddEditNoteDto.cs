using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.NoteDto
{
    public record AddEditNoteDto
    {
        [Required]
        public DateTime DateCreated { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public int? UserId { get; set; }
        [Required]
        public int ConstructionSiteId { get; set; }
    }
}
