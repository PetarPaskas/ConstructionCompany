using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.ClientDto
{
    public class AddClientDto
    {
        [Required]
        public string ClientName { get; set; }
        [Required]
        public string ClientAddress { get; set; }
    }
}
