﻿using ConstructionCompany.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.Common.DTOs.NoteDto
{
    public static class NotesExstensionMethods
    {
        public static GetNoteDto AsDto(this Note note)
        {
            return new GetNoteDto()
            {
                DateCreated = note.DateCreated,
                Description = note.Description,
                Title = note.Title,
                NoteId = note.NoteId,
                ConstructionSite = new StrippedConstructionSiteModel(note),
                User = new StrippedUserModel(note)
            };
        }

        public static Note AsNote(this AddEditNoteDto noteDto) => new Note()
        {
            ConstructionSiteId = noteDto.ConstructionSiteId,
            DateCreated = noteDto.DateCreated,
            Title = noteDto.Title,
            UserId = noteDto.UserId,
            Description = noteDto.Description,
        };
    }
}
