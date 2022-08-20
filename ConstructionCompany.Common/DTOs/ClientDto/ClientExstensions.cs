﻿using ConstructionCompany.Common.DTOs.ConstructionSiteDto;
using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.ClientDto
{
    public static class ClientExstensions
    {
        public static Option AsOption(this Client client) 
            => 
            new Option() 
            {
                Id = client.ClientId,
                Value = client.ClientName,
                IsSelected = false,
                Name = $"{client.ClientName}-{client.ClientId}"
            };

        public static GetClientDto AsDto(this Client client)
            =>
            new GetClientDto()
            {
                ClientId = client.ClientId,
                ClientAddress = client.ClientAddress,
                ClientName = client.ClientName,
                ConstructionSites = client.ConstructionSites.Select(cs=>cs.AsDtoBase())
            };
    }
}
