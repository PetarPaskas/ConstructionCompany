namespace FileProcessOperationsHandler.ProcessTypes
{
    public class XlsxProcessBodyGeneric<T> where T:class
    {
        public IEnumerable<T> Data { get; set; }
        public IEnumerable<object> PreviewData { get; private set; }

        public void SetPreviewData(Func<T, object> selector)
        {
            if(Data is null)
            {
                throw new ArgumentNullException(nameof(Data) + " is null, please assign a value");
            }
            ICollection<object> collection = new List<object>();

            foreach(var item in Data)
            {
                collection.Add(selector(item));
            }

            PreviewData = collection;
        }

    }
    public class XlsxProcessBody
    {
        public IEnumerable<XlsxRowItem> Data { get; set; }
    }
}