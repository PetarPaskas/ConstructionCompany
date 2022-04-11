using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class Note
    {
        public int NoteId { get; set; }
        public DateTime DateCreated { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public int ConstructionSiteId { get; set; }
        public User User { get; set; }
        public ConstructionSite ConstructionSite { get; set; }
    }
}
