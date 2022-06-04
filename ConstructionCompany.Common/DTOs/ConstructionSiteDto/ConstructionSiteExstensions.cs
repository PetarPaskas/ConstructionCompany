using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.ConstructionSiteDto
{
    public static class ConstructionSiteExstensions
    {
        public static GetConstructionSiteDto AsDto(this ConstructionSite constructionSite)
        {
            return new GetConstructionSiteDto()
            {
                ConstructionSiteId = constructionSite.ConstructionSiteId,
                Address = constructionSite.Address,
                DateFinished = constructionSite.DateFinished,
                DateStarted = constructionSite.DateStarted,
                DisplayName = constructionSite.DisplayName,
                IsFinished = constructionSite.IsFinished,
                City = new StrippedCityModel(constructionSite),
                Client = new StrippedClientModel(constructionSite)
            };
        }

        public static Option AsOption(this ConstructionSite site)
        {
            return new Option()
            {
                Id = site.ConstructionSiteId,
                Name = $"{site.DisplayName}-{site.ConstructionSiteId}",
                Value = site.DisplayName,
                IsSelected = false
            };
        }
    }
}
