﻿using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Odco.PointOfSales.Core.Finance
{
    // Invoice : Payment = 1 : M
    [Table("Finance.Payment")]
    public class Payment : FullAuditedEntity<Guid>
    {
        #region Invoice
        public Guid InvoiceId { get; set; }

        public Invoice Invoice { get; set; }

        [Required]
        [StringLength(15)]
        public string InvoiceNumber { get; set; }
        #endregion

        public Guid? CustomerId { get; set; }

        [StringLength(15)]
        public string CustomerPhoneNumber { get; set; }

        #region Cash
        public decimal? CashAmount { get; set; }
        #endregion

        #region Cheque
        [StringLength(25)]
        public string ChequeNumber { get; set; }

        public Guid? BankId { get; set; }

        [StringLength(100)]
        public string Bank { get; set; }

        public Guid? BranchId { get; set; }

        [StringLength(100)]
        public string Branch { get; set; }

        public DateTime? ChequeReturnDate { get; set; }

        public decimal? ChequeAmount { get; set; }
        #endregion

        #region Credit Outstanding
        public decimal? OutstandingAmount { get; set; }

        public decimal? OutstandingSettledAmount { get; set; }
        #endregion

        #region Debit Card

        #endregion

        #region Gift Card
        public decimal? GiftCardAmount { get; set; }
        #endregion

        public bool IsCash { get; set; }
        
        public bool IsCheque { get; set; }
        
        public bool IsCreditOutstanding { get; set; }
        
        public bool IsDebitCard { get; set; }
        
        public bool IsGiftCard { get; set; }
    }
}
