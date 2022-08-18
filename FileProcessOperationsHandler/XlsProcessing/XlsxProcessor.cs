
using FileProcessOperationsHandler.ProcessTypes;
using FileProcessOperationsHandler.XlsProcessing.Interfaces;


namespace FileProcessOperationsHandler.XlsProcessing
{
    public class XlsxProcessor : IXlsxProcessor
    {
        private readonly IXlsxProcessorHelper _xlsxProcessorHelper;
        public XlsxProcessor(IXlsxProcessorHelper xlsxProcessorHelper)
        {
            _xlsxProcessorHelper = xlsxProcessorHelper;
        }

        public async Task Process(XlsxProcessData data, XlsxProcessorOptions options)
        {
            if (options == null)
                options = XlsxProcessorOptions.Default;

            //GeneratePath
            string randomFolderName = _xlsxProcessorHelper.GenerateRandomName(8);
            string path = @$"{Directory.GetCurrentDirectory()}\{randomFolderName}\{data.FileName}.{(data.IsXlsType ? "xls" : "xlsx")}";
            string defaultWorksheetName = "Data";

            using (ExcelPackage package = _xlsxProcessorHelper.CreateXlsxFilePackage(path))
            {
                //So you don't append the same worksheet name the same time
                _xlsxProcessorHelper.DeleteXlsxFileIfExists();

                ExcelWorksheet worksheet = _xlsxProcessorHelper.AddWorksheet(defaultWorksheetName);

                _xlsxProcessorHelper.AppendDataToWorksheet(worksheet, data);

                _xlsxProcessorHelper.ApplyStylesToWorksheet(worksheet, options);

                await _xlsxProcessorHelper.SaveChangesAsync();
            };
             

        }
    }
}
