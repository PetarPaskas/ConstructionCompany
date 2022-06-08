using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common
{
    public record StrippedUserModel
    {
        public int? UserId { get; set; }
        public string FullName { get; set; }

        public StrippedUserModel()
        {

        }

        public StrippedUserModel(Note note)
        {
            if (note.UserId.HasValue)
            {
                UserId = note.UserId.Value;
                FullName = note.User.FullName;
            }
            else
            {
                UserId = null;
                FullName = String.Empty;
            }

        }
    }
}
