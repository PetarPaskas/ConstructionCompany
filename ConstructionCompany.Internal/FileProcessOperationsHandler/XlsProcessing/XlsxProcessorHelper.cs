using FileProcessOperationsHandler.ProcessTypes;
using FileProcessOperationsHandler.XlsProcessing.Interfaces;


namespace FileProcessOperationsHandler.XlsProcessing
{
    public class XlsxProcessorHelper : IXlsxProcessorHelper
    {
        private FileInfo _file = null;
        private ExcelPackage _xlsxPackage = null;
        private XlsxIdentificationHelper _documentState = new();

        #region workflow_helpers
        public FileInfo GetCurrentFile()
        {
            return _file;
        }
        public ExcelPackage CreateXlsxFilePackage(string path)
        {
            _file = new FileInfo(path);
            _xlsxPackage = new ExcelPackage(_file);
            return _xlsxPackage;
        }
        public bool DeleteXlsxFileIfExists()
        {
            if (_file != null)
            {
                if (_file.Exists)
                {
                    _file.Delete();
                    return true;
                }
            }
            return false;
        }
        public ExcelWorksheet AddWorksheet(string worksheetName)
        {
            var worksheet = _xlsxPackage.Workbook.Worksheets.Add(worksheetName);
            _documentState.WorksheetName = worksheetName;
            return worksheet;
        }
        public async Task<bool> SaveChangesAsync()
        {
            await _xlsxPackage.SaveAsync();
            return await Task.FromResult(true);
        }

        public string GenerateRandomFolder(string rootPath, int size)
        {
            string name = "";
            Random random = new();

            for(int i = 0; i < size; i++)
            {
               var character = (char)random.Next(97, 122);
               name = name + character;
            }

            string path = $@"{rootPath}/${name}";

            if(!Directory.Exists(path))
            Directory.CreateDirectory(path);

            return path;
        }

        public async Task<byte[]> GetBytes()
        {
            byte[] bytes = null;

            _file.Refresh();

            using (FileStream fileStream = _file.OpenRead())
            {
                using(MemoryStream memStream = new())
                {
                    await fileStream.CopyToAsync(memStream);
                    bytes = memStream.ToArray();
                }
            }

            return bytes;
        }

        #endregion

        #region data_styling
        public void ApplyStylesToWorksheet(ExcelWorksheet ws, XlsxProcessorOptions options)
        {
            StypeHeaderData(ws, options);
            StyleBodyData(ws, options);
            StyleFooterData(ws, options);

            if (options.ColumnWidth > 0)
            {
                for (int i = 1; i <= _documentState.BodyEndColumn - 1; i++)
                {
                    ws.Column(i).Width = options.ColumnWidth;
                }
            }

        }
        private void StyleBodyData(ExcelWorksheet ws, XlsxProcessorOptions options)
        {
            int startRow = _documentState.BodyStartRow;
            int endRow = _documentState.BodyEndRow-1;

            int startColumn = _documentState.BodyStartColumn;
            int endColumn = _documentState.BodyEndColumn-1;

            for (int row = startRow; row <= endRow; row++)
            {
                for (int col = startColumn; col <= endColumn; col++)
                {
                    ExcelRange cell = ws.Cells[row, col];

                    ws.Column(col).Width = options.ColumnWidth;

                    //setting fill
                    if (!options.HaveIndifferentBodyColumns)
                    {
                        if (col % 2 == 0)
                            cell.Style.Fill.SetBackground(options.Color1);
                        else
                            cell.Style.Fill.SetBackground(options.Color2);
                    }

                    //font-size
                    cell.Style.Font.Size = options.BodyFontSize;

                    //autofit columns
                    if (options.AutoFitBodyCells)
                        cell.AutoFitColumns();

                    //first row specific
                    if (row == startRow)
                    {
                        //Bold
                        cell.Style.Font.Bold = options.FirstBodyRowBold;

                        //Horizontal center
                        if (options.HorizonalCenterFirstBodyRow)
                            cell.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    }

                    //rest of the rows
                    if (row != startRow)
                    {
                        //Bold
                        cell.Style.Font.Bold = options.BoldRestOfTheBody;

                        //Horizontal center
                        if (options.HorizontalCenterRestOfTheBody)
                            cell.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    }

                }
            }
        }

        private void StyleFooterData(ExcelWorksheet ws, XlsxProcessorOptions options)
        {
            int startRow = _documentState.FooterStartRow;
            int endRow = _documentState.FooterEndRow;

            int startColumn = _documentState.FooterStartColumn;
            int endColumn = _documentState.FooterEndColumn;


            for (int row = startRow; row <= endRow; row++)
            {
                for (int col = startColumn; col <= endColumn; col++)
                {
                    ExcelRange cell = ws.Cells[row, col];

                    //Autofit columns
                    if (options.AutoFitFooterCells)
                        cell.AutoFitColumns();

                     //Bold
                    cell.Style.Font.Bold = options.FooterBold;

                    //Font size
                    cell.Style.Font.Size = options.FooterFontSize;
                }
            }
        }

        private void StypeHeaderData(ExcelWorksheet ws, XlsxProcessorOptions options)
        {
            ExcelRange headerCells = ws.Cells[_documentState.HeaderCells];

            headerCells.Merge = options.MergeHeaderCells;
            headerCells.Style.Font.Size = options.HeaderFontSize;
            headerCells.Style.Font.Bold = options.HeaderBold;

            if (options.AutoFitHeaderCells)
                headerCells.AutoFitColumns();
        }
        #endregion

        #region appending_data
        public void AppendDataToWorksheet(ExcelWorksheet worksheet, XlsxProcessData data)
        {
            if(worksheet != null)
            {
                if(data.Header?.Data != null && data.Header?.Data.Length > 0)
                    AppendHeaderData(worksheet, data.Header);



                if (data.Body.Data != null && data.Body.Data.Any())
                    AppendBodyData(worksheet, data.Body);


                if (data.Footer.Data != null && data.Footer.Data.Any())
                    AppendFooterData(worksheet, data.Footer);
            }
        }
        private void AppendHeaderData(ExcelWorksheet worksheet, XlsxProcessHeader header)
        {

            if (header?.Data != null)
            {
                var cells = worksheet.Cells[_documentState.HeaderCells];
                cells.Value = header.Data;
                
                _documentState.CurrentRow = 4;
                _documentState.CurrentCol = 1;
            }
        }

        private void AppendBodyData(ExcelWorksheet worksheet, XlsxProcessBody body)
        {
            _documentState.SetBodyStartData();

            WriteRowData(worksheet, body.Data);

            //It will write one extra row and column upon writing

            _documentState.SetBodyEndData();
        }

        private void AppendFooterData(ExcelWorksheet worksheet, XlsxProcessFooter footer)
        {
            _documentState.CurrentRow += 2;

            _documentState.SetFooterStartData();

            WriteRowData(worksheet, footer.Data);

            _documentState.SetFooterEndData();
        }

        #endregion

        #region private_helpers
        private void WriteRowData(ExcelWorksheet worksheet, IEnumerable<XlsxRowItem> rows)
        {
            foreach (var row in rows)
            {
                _documentState.CurrentCol = 1;
                foreach (var item in row.RowItems)
                {
                    var cell = worksheet.Cells[_documentState.CurrentRow, _documentState.CurrentCol];
                    cell.Value = item.CellText;

                    if(item.Comments != null && item.Comments.Any())
                    {
                        StringBuilder commentGroup = new();
                        foreach (var comment in item.Comments)
                        {
                            commentGroup.Append(comment);
                        }
                        cell.AddComment(commentGroup.ToString());
                    }

                    ++_documentState.CurrentCol;
                }
                _documentState.CurrentRow++;
                
            }
        }
        private class XlsxIdentificationHelper
        {
            public int CurrentCol { get; set; } = 1;
            public int CurrentRow { get; set; } = 1;
            public string HeaderCells { get; set; } = "A1:C2";

            public int BodyStartRow { get; set; }
            public int BodyEndRow { get; set; }
            public int BodyStartColumn { get; set; }
            public int BodyEndColumn { get; set; }

            public int FooterStartRow { get; set; }
            public int FooterEndRow { get; set; }
            public int FooterStartColumn { get; set; }
            public int FooterEndColumn { get; set; }

            public string WorksheetName { get; set; } = String.Empty;

            public void SetBodyStartData()
            {
                BodyStartRow = CurrentRow;
                BodyStartColumn = CurrentCol;
            }
            public void SetBodyEndData()
            {
                BodyEndRow = CurrentRow;
                BodyEndColumn = CurrentCol;
            }
            public void SetFooterStartData()
            {
                FooterStartRow = CurrentRow;
                FooterStartColumn = CurrentCol;
            }
            public void SetFooterEndData()
            {
                FooterEndRow = CurrentRow;
                FooterEndColumn= CurrentCol;
            }

        }

        #endregion

    }
}
