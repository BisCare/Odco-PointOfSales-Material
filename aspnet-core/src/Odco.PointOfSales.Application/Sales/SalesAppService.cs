﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using Odco.PointOfSales.Application.GeneralDto;
using Odco.PointOfSales.Application.Sales.Customers;
using Odco.PointOfSales.Application.Sales.TemporarySalesHeaders;
using Odco.PointOfSales.Core.Inventory;
using Odco.PointOfSales.Core.Productions;
using Odco.PointOfSales.Core.Sales;
using Odco.PointOfSales.Sales.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Odco.PointOfSales.Application.Inventory.StockBalances;

namespace Odco.PointOfSales.Application.Sales
{
    public class SalesAppService : ApplicationService, ISalesAppService
    {
        private readonly IAsyncQueryableExecuter _asyncQueryableExecuter;
        private readonly IRepository<Customer, Guid> _customerRepository;
        private readonly IRepository<TempSalesHeader, int> _tempSalesHeaderRepository;
        private readonly IRepository<StockBalance, Guid> _stockBalanceRepository;
        private readonly IRepository<Warehouse, Guid> _warehouseRepository;

        public SalesAppService(IRepository<Customer, Guid> customerRepository, 
            IRepository<TempSalesHeader, int> tempSalesHeaderRepository,
            IRepository<StockBalance, Guid> stockBalanceRepository,
            IRepository<Warehouse, Guid> warehouseRepository)
        {
            _asyncQueryableExecuter = NullAsyncQueryableExecuter.Instance;
            _customerRepository = customerRepository;
            _tempSalesHeaderRepository = tempSalesHeaderRepository;
            _stockBalanceRepository = stockBalanceRepository;
            _warehouseRepository = warehouseRepository;
        }

        #region Customer
        public async Task<CustomerDto> CreateCustomerAsync(CreateCustomerDto input)
        {
            try
            {
                var customer = ObjectMapper.Map<Customer>(input);
                var created = await _customerRepository.InsertAsync(customer);
                await CurrentUnitOfWork.SaveChangesAsync();
                return ObjectMapper.Map<CustomerDto>(created);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteCustomerAsync(EntityDto<Guid> input)
        {
            try
            {
                var customer = _customerRepository.FirstOrDefault(pt => pt.Id == input.Id); ;
                await _customerRepository.DeleteAsync(customer);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<PagedResultDto<CustomerDto>> GetAllCustomersAsync(PagedCustomerResultRequestDto input)
        {
            try
            {
                var query = _customerRepository.GetAll()
                        .WhereIf(!input.Keyword.IsNullOrWhiteSpace(),
                        x => x.FirstName.Contains(input.Keyword) || x.MiddleName.Contains(input.Keyword) || x.LastName.Contains(input.Keyword));

                var result = _asyncQueryableExecuter.ToListAsync
                    (
                        query.OrderBy(o => o.CreationTime)
                             .PageBy(input.SkipCount, input.MaxResultCount)
                    );

                var count = await _asyncQueryableExecuter.CountAsync(query);

                var resultDto = ObjectMapper.Map<List<CustomerDto>>(result.Result);
                return new PagedResultDto<CustomerDto>(count, resultDto);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CustomerDto> GetCustomerAsync(EntityDto<Guid> input)
        {
            try
            {
                var customer = await _customerRepository.GetAllIncluding(s => s.Addresses).FirstOrDefaultAsync(pt => pt.Id == input.Id);
                return ObjectMapper.Map<CustomerDto>(customer);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CustomerDto> UpdateCustomerAsync(CustomerDto input)
        {
            try
            {
                var customer = _customerRepository.GetAll().FirstOrDefault(pt => pt.Id == input.Id);
                ObjectMapper.Map(input, customer);
                await _customerRepository.UpdateAsync(customer);
                await CurrentUnitOfWork.SaveChangesAsync();
                return ObjectMapper.Map<CustomerDto>(customer);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CommonKeyValuePairDto>> GetPartialCustomersAsync(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
                return new List<CommonKeyValuePairDto>();

            keyword.ToLower();

            var customers = await _customerRepository
                .GetAll()
                .Where(s => s.FirstName.ToLower().Contains(keyword) || s.MiddleName.ToLower().Contains(keyword) || s.LastName.ToLower().Contains(keyword) || s.Code.Contains(keyword))
                .Take(20)
                .ToListAsync();

            return customers.Select(s => new CommonKeyValuePairDto
            {
                Id = s.Id,
                Code = s.Code,
                Name = $"{s.FirstName} {s.MiddleName} {s.LastName}"
            }).ToList();
        }
        #endregion

        #region TemporarySales Header + Products
        /// <summary>
        /// 1. Create Temporary Sales Header & Product
        /// 2. StockBalance: Shift sales quantity to allocated quantity
        /// 3. Set Default warehouse to selected products (Line Level Products)
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<TempSalesHeaderDto> CreateTempSalesAsync(CreateTempSalesHeaderDto input)
        {
            var warehouse = await _warehouseRepository.FirstOrDefaultAsync(w => w.IsActive && w.IsDefault);
            var stockBalances = new List<StockBalance>();

            // Set Warehouse Details to Line level 
            foreach (var lineLevel in input.TempSalesProducts)
            {
                lineLevel.WarehouseId = warehouse.Id;
                lineLevel.WarehouseCode = warehouse.Code;
                lineLevel.WarehouseName = warehouse.Name;

                stockBalances = await GetStockBalancesAsync(lineLevel.ProductId, warehouse.Id);

                // * Increase in Allocated Qty & Decrease in Book Balance Qty
                // 1. Company Summary
                // 2. Warehouse Summary
                // 3. GRN Summary reduce (specific)
                foreach (var sb in stockBalances)
                {
                    if (sb.SequenceNumber > 0 || sb.Id == lineLevel.StockBalanceId)
                    {
                        sb.AllocatedQuantity += lineLevel.Quantity;
                        sb.BookBalanceQuantity -= lineLevel.Quantity;
                        await _stockBalanceRepository.UpdateAsync(sb);
                    }
                }

            }

            var temp = ObjectMapper.Map<TempSalesHeader>(input);
            var created = await _tempSalesHeaderRepository.InsertAsync(temp);
            await CurrentUnitOfWork.SaveChangesAsync();
            return ObjectMapper.Map<TempSalesHeaderDto>(created);
        }

        public async Task<TempSalesHeaderDto> GetTempSalesAsync(int tempSalesHeaderId)
        {
            var temp = await _tempSalesHeaderRepository
                .GetAllIncluding(t => t.TempSalesProducts)
                .FirstOrDefaultAsync(t => t.Id == tempSalesHeaderId);
            return ObjectMapper.Map<TempSalesHeaderDto>(temp);
        }
        #endregion

        #region Stock Balance
        /// <summary>
        /// Company summary + Warehouse summaries + GRN summaries
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="warehouseId"></param>
        /// <returns></returns>
        private async Task<List<StockBalance>> GetStockBalancesAsync(Guid productId, Guid warehouseId)
        {
            return await _stockBalanceRepository
                .GetAll()
                .Where(sb => sb.ProductId == productId && (!sb.WarehouseId.HasValue || sb.WarehouseId == warehouseId))
                .ToListAsync();
        }
        #endregion
    }
}
