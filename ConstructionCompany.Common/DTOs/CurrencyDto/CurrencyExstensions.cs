using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.CurrencyDto
{
    public static class CurrencyExstensions
    {
        public static Option AsOption(this Currency currency)
        {
            return new Option
            {
                Id = currency.CurrencyId,
                Value = currency.DisplayName,
                Name = $"{currency.DisplayName}-{currency.CurrencyCode}",
                IsSelected = false
            };
        }
    }

}
