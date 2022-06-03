using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public class StrippedCityModel
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string MunicipalityName { get; set; }

        public StrippedCityModel()
        {

        }

        public StrippedCityModel(ConstructionSite constructionSite)
        {
            CityName = constructionSite.City.DisplayName;
            CityId = constructionSite.CityId;
            MunicipalityName = constructionSite.City.Municipality.DisplayName;
        }
    }
}
