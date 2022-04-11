using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class PaymentType
    {
        public int PaymentTypeId { get; set; }
        public int PaymentTypeCode { get; set; }
        public string DisplayName { get; set; }
    }
}
