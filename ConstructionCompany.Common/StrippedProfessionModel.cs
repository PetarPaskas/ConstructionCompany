using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public class StrippedProfessionModel
    {
        public int ProfessionId {get; set;}
        public string ProfessionName {get; set;}

        public StrippedProfessionModel()
        {

        }

        public StrippedProfessionModel(User user)
        {
            this.ProfessionId = user.Profession.ProfessionId;
            this.ProfessionName = user.Profession.DisplayName;
        }
    }
}
