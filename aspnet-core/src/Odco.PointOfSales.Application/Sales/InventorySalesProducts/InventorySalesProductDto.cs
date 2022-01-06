﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Odco.PointOfSales.Sales.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace Odco.PointOfSales.Application.Sales.InventorySalesProducts
{
    [AutoMapTo(typeof(InventorySalesProductDto)), AutoMapFrom(typeof(InventorySalesProduct))]
    public class InventorySalesProductDto : EntityDto<Guid>
    {
        public int SequenceNumber { get; set; }

        #region SalesHeader
        public Guid SaleId { get; set; }

        [StringLength(15)]
        public string SalesNumber { get; set; }
        #endregion

        #region Product
        public Guid ProductId { get; set; }

        [StringLength(15)]
        public string BarCode { get; set; }

        [Required]
        [StringLength(15)]
        public string Code { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        #endregion

        #region StockBalance
        // public Guid[] StockBalanceIds { get; set; }

        // public Guid StockBalanceId { get; set; }

        //public DateTime? ExpiryDate { get; set; }

        //[StringLength(15)]
        //public string BatchNumber { get; set; }

        public Guid? WarehouseId { get; set; }

        [StringLength(10)]
        public string WarehouseCode { get; set; }

        [StringLength(100)]
        public string WarehouseName { get; set; }

        /// <summary>
        /// ADDITIONAL COLOUMN
        /// Group Bu Selling 
        /// Sum of Total BBQ count
        /// </summary>
        public decimal TotalBookBalanceQuantity { get; set; }

        /// <summary>
        /// Store when the time being
        /// </summary>
        //public decimal BookBalanceQuantity { get; set; }

        //[StringLength(10)]
        //public string BookBalanceUnitOfMeasureUnit { get; set; }

        //public decimal CostPrice { get; set; }

        public decimal SellingPrice { get; set; }

        /// <summary>
        /// ADDITIONAL COLOUMN
        /// Previously Received Qty
        /// </summary>
        public decimal ReceivedQuantity { get; set; }

        // public decimal MaximumRetailPrice { get; set; }

        // public bool IsSelected { get; set; }
        #endregion

        public decimal Price { get; set; }

        #region Sales
        public decimal DiscountRate { get; set; }

        public decimal DiscountAmount { get; set; }

        /// <summary>
        /// Needed / Allocated Quantity
        /// </summary>
        public decimal Quantity { get; set; }

        public decimal LineTotal { get; set; }
        #endregion

        [StringLength(100)]
        public string Remarks { get; set; }

        public bool IsActive { get; set; }
    }
}
