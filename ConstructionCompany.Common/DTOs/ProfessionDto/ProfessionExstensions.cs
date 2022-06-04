using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.ProfessionDto
{
    public static class ProfessionExstensions
    {
        public static GetProfessionDto AsDto(this Profession profession)
        {
            return new GetProfessionDto()
            {
                ProfessionId = profession.ProfessionId,
                ProfessionName = profession.DisplayName
            };
        }
    }
}
