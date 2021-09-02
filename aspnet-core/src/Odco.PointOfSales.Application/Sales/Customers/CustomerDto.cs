﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Odco.PointOfSales.Sales.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace Odco.PointOfSales.Application.Sales.Customers
{
    [AutoMapTo(typeof(CustomerDto)), AutoMapFrom(typeof(Customer))]
    public class CustomerDto : EntityDto<Guid>
    {
        [Required]
        [StringLength(10)]
        public string Code { get; set; }

        /// <summary>
        /// Mr, Mrs etc..
        /// </summary>
        public Guid? PersonTitleId { get; set; }

        /// <summary>
        /// Customer Name
        /// </summary>
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [StringLength(100)]
        public string MiddleName { get; set; }

        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [StringLength(15)]
        public string ContactNumber1 { get; set; }

        [StringLength(15)]
        public string ContactNumber2 { get; set; }

        [StringLength(15)]
        public string ContactNumber3 { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        /// <summary>
        /// Count of outstanding invoices 
        /// </summary>
        public int? NoOfInvoices { get; set; }

        /// <summary>
        /// Define the amount of rupees
        /// </summary>
        public decimal? CreditLimit { get; set; }

        /// <summary>
        /// 1 - 30 days => drop down list
        /// </summary>
        public int? CreditPeriod { get; set; }

        /// <summary>
        /// 0 - 100
        /// </summary>
        public decimal? DiscountRate { get; set; }

        public Guid? ClassificationId { get; set; }

        public Guid? PriceGroupId { get; set; }

        public bool IsActive { get; set; }
    }
}
