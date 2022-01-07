﻿using Abp.AutoMapper;
using Odco.PointOfSales.Application.Finance.Payments.PaymentTypes;
using Odco.PointOfSales.Application.Inventory.NonInventorySalesProducts;
using Odco.PointOfSales.Application.Sales.InventorySalesProducts;
using Odco.PointOfSales.Core.Enums;
using Odco.PointOfSales.Core.Sales;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Odco.PointOfSales.Application.Sales.Sales
{
    [AutoMapTo(typeof(Sale))]
    public class CreateOrUpdateSaleDto
    {
        public CreateOrUpdateSaleDto()
        {
            InventorySalesProducts = new HashSet<CreateInventorySalesProductDto>();
            NonInventorySalesProducts = new HashSet<CreateNonInventorySalesProductDto>();
            //PaymentDtos
            Cashes = new HashSet<CashDto>();
            Cheques = new HashSet<ChequeDto>();
            Outstandings = new HashSet<CustomerCreditOutstandingDto>();
            DebitCards = new HashSet<DebitCardDto>();
            GiftCards = new HashSet<GiftCardDto>();
        }

        /// <summary>
        /// Exist: Update
        /// Not Exist: Create
        /// </summary>
        public Guid? Id { get; set; }

        [StringLength(15)]
        public string SalesNumber { get; set; }

        [StringLength(15)]
        public string ReferenceNumber { get; set; }

        public Guid? CustomerId { get; set; }

        [StringLength(10)]
        public string CustomerCode { get; set; }

        [StringLength(100)]
        public string CustomerName { get; set; }

        public decimal DiscountRate { get; set; }

        public decimal DiscountAmount { get; set; }

        public decimal TaxRate { get; set; }

        public decimal TaxAmount { get; set; }

        public decimal GrossAmount { get; set; }

        public decimal NetAmount { get; set; }

        #region Used for storing Received & Balance Amounts of Customer in "Payment" Model
        /// <summary>
        /// Total Received amount, Includes (Cash, Cheque)
        /// </summary>
        public decimal ReceivedAmount { get; set; } = 0;

        /// <summary>
        /// Balance amount against the NetAmount - ReceivedAmount
        /// </summary>
        public decimal BalanceAmount { get; set; } = 0;
        #endregion

        [StringLength(100)]
        public string Remarks { get; set; }

        public PaymentStatus PaymentStatus { get; set; }

        public bool IsActive { get; set; }

        public ICollection<CreateInventorySalesProductDto> InventorySalesProducts { get; set; }

        public ICollection<CreateNonInventorySalesProductDto> NonInventorySalesProducts { get; set; }

        #region Payment Types
        public ICollection<CashDto> Cashes { get; set; }
        public ICollection<ChequeDto> Cheques { get; set; }
        public ICollection<CustomerCreditOutstandingDto> Outstandings { get; set; }
        public ICollection<DebitCardDto> DebitCards { get; set; }
        public ICollection<GiftCardDto> GiftCards { get; set; }
        #endregion
    }
}
