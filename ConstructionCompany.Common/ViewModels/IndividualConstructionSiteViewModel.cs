using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.ViewModels
{
    public record IndividualConstructionSiteViewModel
    {
        public int ConstructionSiteId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string CityName { get; set; }
        public DateOnly DateStarted { get; set; }
        public DateOnly ExpectedEndDate { get; set; }
        public IEnumerable<StrippedNoteModel> Notes { get; set; }
        public IEnumerable<StrippedUserModel> Workers { get; set; }
    }
}
