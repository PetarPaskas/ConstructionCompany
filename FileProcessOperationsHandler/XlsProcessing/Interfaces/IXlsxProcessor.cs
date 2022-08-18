using FileProcessOperationsHandler.ProcessTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileProcessOperationsHandler.XlsProcessing.Interfaces
{
    public interface IXlsxProcessor
    {
        Task<byte[]> Process(XlsxProcessData data, XlsxProcessorOptions options);
    }
}
