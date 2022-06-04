using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public class StrippedCurrencyModel
    {
        public int CurrencyId { get; set; }
        public string CurrencyName { get; set; }

        public StrippedCurrencyModel()
        {

        }

        public StrippedCurrencyModel(User user)
        {
            this.CurrencyId = user.Currency.CurrencyId;
            this.CurrencyName = user.Currency.DisplayName;
        }
    }
}
