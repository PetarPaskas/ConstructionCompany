using ConstructionCompany.Common;
using ConstructionCompany.Common.DTOs.WagesDto;
using ConstructionCompany.DataContext.Interfaces;
using ConstructionCompany.EntityModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Net;

namespace ConstructionCompany.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WagesController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConstructionSiteRepository _constructionSiteRepository;
        private readonly IWageRepository _wageRepository;
        public WagesController
            (
            IUserRepository userRepository,
            IConstructionSiteRepository constructionSiteRepository,
            IWageRepository wageRepository
            )
        {
            _userRepository = userRepository;
            _constructionSiteRepository = constructionSiteRepository;
            _wageRepository = wageRepository;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterWage([FromBody] IEnumerable<PutWagesDto> newWages)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid object");

            string message = CheckForDates(newWages);

            if(!String.IsNullOrEmpty(message.Trim()))
                return BadRequest(message);

            ICollection<Wage> wagesForInsertion = ReadWages(newWages);

            try
            {
               await _wageRepository.AddRangeAndSaveAsync(wagesForInsertion);
                
            }
            catch(Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "Error while saving wages");
            }


            return Ok();
        }

        private string CheckForDates(IEnumerable<PutWagesDto> newWages)
        {

            IEnumerable<int> userIds = newWages.SelectMany(el => el.Data.Select(d => d.UserId)).Distinct();

            ICollection<DateOnly> days = new List<DateOnly>();
            foreach(var wage in newWages)
            {
                days.Add(DateOnly.FromDateTime(wage.Date));
            }

            //Users that have input on those days
            var usersWhoHaveInput = _wageRepository.Where(wage =>
            days.Contains(DateOnly.FromDateTime(wage.WorkDay)) &&
            userIds.Contains(wage.UserId)
            ).ToList();

            if (usersWhoHaveInput.Any())
            {
                var cleanUsersWithCsIds = newWages.SelectMany(nw => nw.Data.Select(obj => new {
                    Date=nw.Date,
                    UserId = obj.UserId,
                    CsIds = obj.Wages.Select(w => w.ConstructionSiteId)
                }
                ));

                var groupedByDay = usersWhoHaveInput.GroupBy(us => us.WorkDay);
                
                foreach(var entry in groupedByDay)
                {
                    foreach (var data in cleanUsersWithCsIds)
                    {
                        if (DateOnly.FromDateTime(entry.Key).Equals(DateOnly.FromDateTime(data.Date)))
                        {
                            foreach (var csId in entry.Select(ent => ent.ConstructionSiteId))
                            {
                                if (data.CsIds.Contains(csId))
                                {
                                    return $"User(id->${data.UserId}) already has an entry for a construction site(id->${csId})";
                                }
                            }
                        }
                    }
                }

            }

            return String.Empty;
        }

        private ICollection<Wage> ReadWages(IEnumerable<PutWagesDto> newWages)
        {
            ICollection<Wage> wagesForInsetion = new List<Wage>();

            foreach (var wage in newWages)
            {
                DateTime dateForInsertion = wage.Date;

                foreach (WagesInfo data in wage.Data)
                {
                    foreach (WagesCarryData info in data.Wages)
                    {
                        Wage newWage = new()
                        {
                            UserId = data.UserId,
                            ConstructionSiteId = info.ConstructionSiteId,
                            WorkDay = dateForInsertion,
                            HoursDone = info.HoursDone,
                            HoursRequired = 8
                        };

                        wagesForInsetion.Add(newWage);
                    }
                }
            }

            return wagesForInsetion;
        }
    }
}
