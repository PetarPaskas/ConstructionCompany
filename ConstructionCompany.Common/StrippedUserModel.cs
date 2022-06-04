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
        public int UserId { get; set; }
        public string FullName { get; set; }

        public StrippedUserModel()
        {

        }

        public StrippedUserModel(Note note)
        {
            UserId = note.UserId;
            FullName = note.User.FullName;
        }
    }
}
