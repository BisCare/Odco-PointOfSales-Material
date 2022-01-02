﻿using Abp.Domain.Entities.Auditing;
using Odco.PointOfSales.Core.Sales;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Odco.PointOfSales.Core.Finance
{
    // Sale : Payment = 1 : M
    [Table("Finance.Payment")]
    public class Payment : FullAuditedEntity<Guid>
    {
        #region Sales
        public Guid SaleId { get; set; }

        public Sale Sale { get; set; }

        [Required]
        [StringLength(15)]
        public string SaleNumber { get; set; }

        /// <summary>
        /// Similar to PaymentNumber = InvoiceNumber
        /// Exist: When creating a Payment
        /// Sale : InvoiceNumber = 1 : M
        /// </summary>
        [Required]
        [StringLength(15)]
        public string InvoiceNumber { get; set; }
        #endregion

        public Guid? CustomerId { get; set; }

        [StringLength(10)]
        public string CustomerCode { get; set; }

        [StringLength(150)]
        public string CustomerName { get; set; }

        [StringLength(15)]
        public string CustomerPhoneNumber { get; set; }

        #region Cash

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
        #endregion

        #region Credit Outstanding
        public decimal? OutstandingAmount { get; set; }
        #endregion

        #region Debit Card

        #endregion

        #region Gift Card

        #endregion

        public decimal PaidAmount { get; set; }

        public bool IsCash { get; set; }
        
        public bool IsCheque { get; set; }
        
        public bool IsCreditOutstanding { get; set; }
        
        public bool IsDebitCard { get; set; }
        
        public bool IsGiftCard { get; set; }
    }
}
