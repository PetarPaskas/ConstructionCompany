using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public class ClientErrorMessage
    {
        public string Message { get; set; }

        public ClientErrorMessage(string errorMessage)
        {
            Message = errorMessage;
        }
    }
}
