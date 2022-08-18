using ConstructionCompany.Common;
using ConstructionCompany.Common.DTOs.WagesDto;
using ConstructionCompany.DataContext.Interfaces;
using ConstructionCompany.EntityModels;
using FileProcessOperationsHandler.ProcessTypes;
using FileProcessOperationsHandler.XlsProcessing.Interfaces;
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
        private readonly IXlsxProcessor _xlsxProcessor;
        public WagesController
            (
            IUserRepository userRepository,
            IConstructionSiteRepository constructionSiteRepository,
            IWageRepository wageRepository,
            IXlsxProcessor xlsxProcessor
            )
        {
            _userRepository = userRepository;
            _constructionSiteRepository = constructionSiteRepository;
            _wageRepository = wageRepository;
            _xlsxProcessor = xlsxProcessor;
        }

        [HttpPost]
        public async Task<IActionResult> RequestFile(FileRequestData request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var data = await _wageRepository.GetAllForDateAsync(request.Date);
            //Format data
            XlsxProcessData processData = FormatData(data);
            processData.Header.Data = $"Izveštaj za ${request.Date.Month} - ${request.Date.Year}";
            processData.FileName = $"Izveštaj {request.Date.Month}-{request.Date.Year}";

            //Generate a file
            byte[] xlsxFile = await _xlsxProcessor.Process(processData, null);
            string xlsxContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            string fileDownloadName = $"{processData.FileName}.{(processData.IsXlsType ? "xls" : "xslx")}";

            return File(xlsxFile, xlsxContentType, fileDownloadName);
        }

        #region Request-file-private
        private XlsxProcessData FormatData(IEnumerable<Wage> wages)
        {

           var users = wages.Select(w => w.User);

            var finalBody = new List<List<string>>();

            var firstRow = new List<string>();
            var footerRow = new List<string>();

            footerRow.Add("Ukupno: ");
            firstRow.Add("");

            finalBody.Add(firstRow);


            foreach (var workDay in wages.Select(w => w.WorkDay).OrderBy(day=>day.Day))
            {
                //On each new day, create a new row of data
                List<string> data = new();
                finalBody.Add(data);

                data.Add($"{workDay.Day}");

                foreach(var user in users)
                {
                    //Fill body
                    firstRow.Add($"{user.FullName}");
                    var hoursDoneOnDay = user.Wages.Where(w => w.WorkDay == workDay).Sum(w => w.HoursDone);
                    double income = hoursDoneOnDay * user.HourlyRate;
                    data.Add($"{income}");

                    //Fill footer
                    var hoursDoneInTotal = user.Wages.Sum(w => w.HoursDone);
                    var totalForUser = hoursDoneInTotal * user.HourlyRate;
                    footerRow.Add($"{totalForUser}");
                }
            }

            XlsxProcessData processData = new()
            {
                Footer = new()
                {
                    Data = new List<XlsxRowItem>()
                    {
                        new XlsxRowItem()
                        {
                            RowItems = footerRow
                        }
                    }
                },
                Body = new()
                {
                    Data = finalBody.Select(row => new XlsxRowItem() { RowItems = row })
                },
                Header = new() 
                {
                    Data = ""
                },
                IsXlsType = false
            };

            return processData;
        }
        #endregion

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
                return StatusCode((int)HttpStatusCode.InternalServerError, $"Error while saving wages - {ex.Message}");
            }


            return Ok();
        }

        #region private_methods
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
        #endregion
    }
}
