﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.ProfessionDto
{
    public record GetProfessionDto
    {
        public int ProfessionId { get; set; }
        public string ProfessionName { get; set; }
    }
}
