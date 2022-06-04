using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.CityDto
{
    public record GetCityDto
    {
        public string CityName { get; set; }
        public int CityId { get; set; }
        public string MunicipalityName{ get;set; }
        public int MunicipalityId { get; set; }
    }
}
