using FileProcessOperationsHandler.ProcessTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileProcessOperationsHandler.XlsProcessing.Interfaces
{
    public interface IXlsxProcessorHelper
    {
        FileInfo GetCurrentFile();
        bool DeleteXlsxFileIfExists();
        ExcelPackage CreateXlsxFilePackage(string path);
        ExcelWorksheet AddWorksheet(string worksheetName);
        void AppendDataToWorksheet(ExcelWorksheet worksheet, XlsxProcessData data);
        void ApplyStylesToWorksheet(ExcelWorksheet ws, XlsxProcessorOptions options);
        Task<bool> SaveChangesAsync();
        string GenerateRandomName(int size);
        Task<byte[]> GetBytes();
    }
}
