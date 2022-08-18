using System.Drawing;

namespace FileProcessOperationsHandler.ProcessTypes
{
    public class XlsxProcessorOptions
    {
        public int BodyFontSize { get; init; } 
        public bool FirstBodyRowBold { get; init; } 
        public bool AutoFitBodyCells { get; init; } 
        public bool BoldRestOfTheBody { get;init; }
        public bool HorizonalCenterFirstBodyRow { get; init; }
        public bool HorizontalCenterRestOfTheBody { get; init; }

        public int HeaderFontSize { get; init; } 
        public bool HeaderBold { get; init; } 
        public bool AutoFitHeaderCells { get; init; } 
        public bool MergeHeaderCells { get; init; }

        public bool HaveIndifferentBodyColumns { get; init; } 
        public Color Color1 { get; init; } 
        public Color Color2 { get; init; } 

        public bool AutoFitFooterCells { get; init; }
        public int FooterFontSize { get; init; }
        public bool FooterBold { get; init; }

        public static XlsxProcessorOptions Default { get 
            {
                return new XlsxProcessorOptions()
                {
                    BodyFontSize = 15,
                    FirstBodyRowBold = true,
                    BoldRestOfTheBody = false,
                    AutoFitBodyCells = true,
                    HorizonalCenterFirstBodyRow = true,
                    HorizontalCenterRestOfTheBody = false,

                    MergeHeaderCells = true,
                    HeaderFontSize = 20,
                    HeaderBold = true,
                    AutoFitHeaderCells = true,

                    HaveIndifferentBodyColumns = false,
                    Color1 = Color.PaleTurquoise,
                    Color2 = Color.WhiteSmoke,

                    AutoFitFooterCells = true,
                    FooterFontSize = 18,
                    FooterBold = true
                };
            } 
             }

    }
}