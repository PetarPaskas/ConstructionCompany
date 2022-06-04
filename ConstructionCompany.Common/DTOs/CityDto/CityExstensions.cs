using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.CityDto
{
    public static class CityExstensions
    {
        public static GetCityDto AsDto(this City city)
        {
            return new GetCityDto()
            {
                CityId = city.CityId,
                CityName = city.DisplayName,
                MunicipalityName = city.Municipality.DisplayName,
                MunicipalityId = city.MunicipalityId
            };
        }
    }
}
