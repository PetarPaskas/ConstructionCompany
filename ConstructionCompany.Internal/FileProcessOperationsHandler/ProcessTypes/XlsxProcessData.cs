using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileProcessOperationsHandler.ProcessTypes
{
    public class XlsxProcessData
    {
        /// <summary>
        /// Set content for A1:C2 cells which are grouped together.
        /// </summary>
        public XlsxProcessHeader Header { get; set; }
        public XlsxProcessBody Body { get; set; }
        public XlsxProcessFooter Footer { get; set; }
        public string FileName { get; set; }
        public bool IsXlsType { get; set; }
        //public XlsxProcessBody<T> Body { get; set; }

        //public void SetBodyPreviewData(Func<T, object> selector)
        //{
        //    Body.SetPreviewData(selector);
        //}
    }
}
