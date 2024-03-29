﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.EntityModels
{
    public class EarlyPayment
    {
        public int EarlyPaymentId { get; set; }
        public bool IsResolved { get; set; }
        public decimal Sum { get; set; }
        public DateTime BorrowStartDate { get; set; }
        public DateTime BorrowEndDate { get; set; }
        public DateTime BorrowReturnDate { get; set; }
        public int UserId { get; set; }
        public int NoteId { get; set; }
        public int PaymentTypeId { get; set; }
        public User User { get; set; }
        public Note Note { get; set; }
        public PaymentType PaymentType { get; set; }
    }
}
