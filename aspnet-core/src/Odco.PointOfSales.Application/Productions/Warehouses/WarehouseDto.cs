﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Odco.PointOfSales.Core.Productions;
using System;
using System.ComponentModel.DataAnnotations;

namespace Odco.PointOfSales.Application.Productions.Warehouses
{
    [AutoMapTo(typeof(WarehouseDto)), AutoMapFrom(typeof(Warehouse))]
    public class WarehouseDto : EntityDto<Guid>
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Description { get; set; }

        [StringLength(50)]
        public string ContactPersonName { get; set; }

        [StringLength(15)]
        public string ContactNumber { get; set; }

        public bool IsActive { get; set; }
    }
}
