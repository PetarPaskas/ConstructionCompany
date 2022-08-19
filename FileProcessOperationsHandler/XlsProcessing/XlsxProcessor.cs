
using FileProcessOperationsHandler.ProcessTypes;
using FileProcessOperationsHandler.XlsProcessing.Interfaces;


namespace FileProcessOperationsHandler.XlsProcessing
{
    public class XlsxProcessor : IXlsxProcessor
    {
        private readonly IXlsxProcessorHelper _xlsxProcessorHelper;
        public XlsxProcessor(IXlsxProcessorHelper xlsxProcessorHelper)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            _xlsxProcessorHelper = xlsxProcessorHelper;
        }

        public async Task<byte[]> Process(XlsxProcessData data, XlsxProcessorOptions options)
        {
           
            if (options == null)
                options = XlsxProcessorOptions.Default;

            string rootPath = @$"{Directory.GetCurrentDirectory()}\Files";

            //GeneratePath
            string randomFolderName = _xlsxProcessorHelper.GenerateRandomFolder(rootPath, 8);
            string path = @$"{randomFolderName}\{data.FileName}.{(data.IsXlsType ? "xls" : "xlsx")}";
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

            return await _xlsxProcessorHelper.GetBytes();
        }
    }
}
