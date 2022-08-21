using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.UserDto
{
    public static class UsersExstension
    {
        public static GetUsersDto AsDto(this User user)
        {
            var newUser = new GetUsersDto()
            {
                FullName = user.FullName,
                UserId = user.UserId,
                Username = user.Username,
                PhoneNumber = user.PhoneNumber,
                Name = user.Name,
                Surname = user.Surname,
                Nickname = user.Nickname,
                HourlyRate = user.HourlyRate,
                EmploymentStartDate = user.EmploymentStartDate,
                EmploymentEndDate = user.EmploymentEndDate,
                Profession = new StrippedProfessionModel(user),
                Currency = new StrippedCurrencyModel(user),
                ConstructionSite = null,
                Wages = null
            };

            if(user.ConstructionSiteId.HasValue)
                newUser.ConstructionSite = new StrippedConstructionSiteModel(user);

            return newUser;
        }

        public static GetUsersDto AsDtoWithConstructionSite(this User user, DateTime date)
        {
            var dtoUser = user.AsDto();
            dtoUser.ConstructionSite = new StrippedConstructionSiteModel(user, date);

            return dtoUser;
        }
        public static GetUsersDto AsDtoWithWages(this User user)
        {
            var dtoUser = user.AsDto();

            dtoUser.Wages = user.Wages.Select(w => new StrippedWageModel()
            {
                WageId = w.WageId,
                HoursDone = w.HoursDone,
                HoursRequired = w.HoursRequired,
                WorkDay = w.WorkDay,
                ConstructionSite = new StrippedConstructionSiteModel(w)
            });

            return dtoUser;
        }
        
        public static User AsUser(this AddEditUserDto userDto)
        {
            return new User()
            {
                ConstructionSiteId = userDto.ConstructionSitesId,
                CurrencyId = userDto.CurrencyId,
                EmploymentEndDate = userDto.EmploymentEndDate,
                EmploymentStartDate = userDto.EmploymentStartDate,
                HourlyRate = userDto.HourlyRate,
                Username = "",
                Name = userDto.Name,
                Surname = userDto.Surname,
                Nickname = userDto.Nickname,
                PhoneNumber = userDto.PhoneNumber,
                IsDisabled = false,
                Password = "",
                ProfessionId = userDto.ProfessionId,
            };
        }

    }
}
