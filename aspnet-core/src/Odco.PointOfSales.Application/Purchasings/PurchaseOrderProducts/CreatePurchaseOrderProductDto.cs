﻿using Abp.AutoMapper;
using Odco.PointOfSales.Core.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace Odco.PointOfSales.Application.Purchasings.PurchaseOrderProducts
{
    [AutoMapTo(typeof(PurchaseOrderProduct))]
    public class CreatePurchaseOrderProductDto
    {
        public int SequenceNo { get; set; }

        public Guid ProductId { get; set; }

        [Required]
        [StringLength(10)]
        public string ProductCode { get; set; }

        [StringLength(100)]
        public string ProductName { get; set; }

        public Guid WarehouseId { get; set; }

        [StringLength(10)]
        public string WarehouseCode { get; set; }

        [StringLength(100)]
        public string WarehouseName { get; set; }

        public decimal CostPrice { get; set; }

        public decimal OrderQuantity { get; set; }

        public decimal FreeQuantity { get; set; }

        public decimal DiscountRate { get; set; }

        public decimal DiscountAmount { get; set; }

        public decimal LineTotal { get; set; }

        [StringLength(100)]
        public string Remarks { get; set; }
    }
}
