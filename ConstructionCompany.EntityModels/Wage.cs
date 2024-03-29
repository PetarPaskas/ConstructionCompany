﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class Wage
    {
        public int WageId { get; set; }
        public int UserId { get; set; }
        public int ConstructionSiteId { get; set; }
        public DateTime WorkDay { get; set; }
        public double HoursDone { get; set; }
        public int HoursRequired { get; set; }
        public User User { get; set; }
        public ConstructionSite ConstructionSite { get; set; }
    }
}
