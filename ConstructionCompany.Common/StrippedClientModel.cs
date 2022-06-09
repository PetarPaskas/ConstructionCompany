using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public record StrippedClientModel
    {
        public string ClientId { get; set; }
        public string Name { get; set; }

        public StrippedClientModel()
        {

        }

        public StrippedClientModel(ConstructionSite constructionSite)
        {
            Client client = constructionSite.Client;

            ClientId = client?.ClientId ?? "";
            Name = client?.ClientName ?? "";
        }
    }
}
