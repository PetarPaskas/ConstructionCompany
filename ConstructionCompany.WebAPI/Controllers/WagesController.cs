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

        [HttpPost("[action]")]
        public async Task<IActionResult> RequestFile([FromBody] FileRequestData request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var data = (await _wageRepository.GetAllForDateAsync(request.Date)) as List<Wage>;
            //Format data
            XlsxProcessData processData = FormatData(data, request);

            //Generate a file
            byte[] xlsxFile = await _xlsxProcessor.Process(processData, null);
            string xlsxContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            string fileDownloadName = $"{processData.FileName}.{(processData.IsXlsType ? "xls" : "xslx")}";

            return File(xlsxFile, xlsxContentType, fileDownloadName);
        }

        #region Request-file-private
        private XlsxProcessData FormatData(ICollection<Wage> wages, FileRequestData request)
        {
            /*----------FOOTER SUMMARY---------*/
            Dictionary<int, double> footerValues = new Dictionary<int, double>();
            //key => userId
            //value => sum of earnings

            /*----------BODY SUMMARY---------*/
            var wagesOrdered = wages.OrderBy(w => w.WorkDay);
            var usersInWages = new List<User>(); 
            foreach(var user in wagesOrdered.Select(w => w.User))
            {
                if(!usersInWages.Exists(u=>u.UserId==user.UserId))
                    usersInWages.Add(user);
            }

            List<string> firstRow = new();
            firstRow.Add("");

            if (usersInWages is null)
                throw new ArgumentNullException("Users in wages collection is empty");

            for (int i = 0; i < usersInWages.Count; i++)
            {
                var user = usersInWages[i];
                firstRow.Add(user.FullName);
            }

            var body = new List<List<string>>();
            body.Add(firstRow);

            DateTime? tryEndDate = null;

            if(request.Date.Month == 12)
            {
                tryEndDate = new DateTime(request.Date.Year + 1, 1, 1).AddDays(-1);
            }
            else
            {
                tryEndDate = new DateTime(request.Date.Year, request.Date.Month + 1, 1).AddDays(-1);
            }

            var endDate = tryEndDate.Value;
            var startDate = new DateTime(request.Date.Year, request.Date.Month, 1);
          
            for (int currDay = startDate.Day; currDay <= endDate.Day; currDay++)
            {
                List<string> row = new();
                row.Add($"{currDay}");

                foreach (var user in usersInWages)
                {
                    var dateNow = new DateTime(request.Date.Year, request.Date.Month, currDay);

                    var todaysWagesForUser = wagesOrdered.Where(w => 
                                                                (DateOnly.FromDateTime(w.WorkDay) == DateOnly.FromDateTime(dateNow))
                                                                && w.UserId == user.UserId);

                    var hoursDone = todaysWagesForUser.Sum(wage => wage.HoursDone);
                    var moneyEarned = Math.Round(hoursDone * user.HourlyRate,2);

                    row.Add($"{moneyEarned} {user.Currency.DisplayName}");

                    //calculate footer sumamry
                    if (!footerValues.ContainsKey(user.UserId))
                    {
                        footerValues.Add(user.UserId, moneyEarned);
                    }
                    else
                    {
                        footerValues[user.UserId] = footerValues[user.UserId] + moneyEarned;
                    }
                }

                body.Add(row);
            }

            List<XlsxRowItem> FormatBody = new();
            foreach(var item in body)
            {
                FormatBody.Add(new XlsxRowItem() { RowItems = item});
            }

            /*------------------ FOOTER CALCULATIONS -------------------*/
            List<string> footer = new();
            footer.Add("Ukupno: ");

            foreach(var user in usersInWages)
            {
                footer.Add(footerValues[user.UserId].ToString());
            }

            XlsxProcessData processData = new()
            {
                Footer = new()
                {
                    Data = new List<XlsxRowItem>()
                    {
                        new XlsxRowItem()
                        {
                            RowItems = footer
                        }
                    }
                },
                Body = new()
                {
                    Data = FormatBody
                },
                Header = new()
                {
                    Data = $"Izveštaj za {request.Date.Month}-{request.Date.Year}"
                },
                FileName = $"Izveštaj {request.Date.Month}-{request.Date.Year}"
            };

            if (request.FileType == FileTypeEnum.XlsFile)
                processData.IsXlsType = true;
            else
                processData.IsXlsType = false;

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
