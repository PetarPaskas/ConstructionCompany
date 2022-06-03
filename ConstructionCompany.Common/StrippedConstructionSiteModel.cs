using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public record StrippedConstructionSiteModel
    {
        public int ConstructionSiteId { get; set; }
        public string ConstructionSiteName { get; set; }

        public StrippedConstructionSiteModel()
        {

        }

        public StrippedConstructionSiteModel(Wage wage)
        {
            ConstructionSiteId = wage.ConstructionSiteId;
            ConstructionSiteName = wage.ConstructionSite.DisplayName;
        }

        public StrippedConstructionSiteModel(User user)
        {

            ConstructionSiteId = user.ConstructionSite.ConstructionSiteId;
            ConstructionSiteName = user.ConstructionSite.DisplayName;
        }

        public StrippedConstructionSiteModel(User user, DateTime date)
        {
            var cSite = user
                            .Wages
                            .Single(w => w.WorkDay.Equals(date))
                            .ConstructionSite;

            ConstructionSiteId = cSite.ConstructionSiteId;
            ConstructionSiteName = cSite.DisplayName;
        }

        public StrippedConstructionSiteModel(User user, int constructionSiteId)
        {
            var cSite = user
                            .Wages
                            .Single(w => w.ConstructionSiteId == constructionSiteId)
                            .ConstructionSite;

            ConstructionSiteId = cSite.ConstructionSiteId;
            ConstructionSiteName = cSite.DisplayName;
        }
    }
}
