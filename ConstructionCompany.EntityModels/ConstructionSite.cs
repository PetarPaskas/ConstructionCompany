using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class ConstructionSite
    {
        public int ConstructionSiteId { get; set; }
        public string DisplayName { get; set; }
        public string Address { get; set; }
        public bool IsFinished { get; set; }
        public DateTime DateStarted { get; set; }
        public DateTime DateFinished { get; set; }
        public int CityId { get; set; }
        public string ClientId { get; set; }
        public City City { get; set; }
        public IEnumerable<Client> Clients { get; set; }
        public IEnumerable<Note> Notes { get; set; }
        public IEnumerable<Wage> Wages { get; set; }

    }
}
