﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Odco.PointOfSales.Application.GeneralDto;
using Odco.PointOfSales.Application.Inventory.StockBalances;
using Odco.PointOfSales.Application.Productions.Brands;
using Odco.PointOfSales.Application.Productions.Categories;
using Odco.PointOfSales.Application.Productions.Products;
using Odco.PointOfSales.Application.Productions.Warehouses;
using Odco.PointOfSales.Core.Enums;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Odco.PointOfSales.Application.Productions
{
    public interface IProductionAppService : IApplicationService
    {
        #region Product
        Task<ProductDto> CreateProductAsync(CreateProductDto input);
        Task DeleteProductAsync(EntityDto<Guid> input);
        Task<ProductDto> GetProductAsync(EntityDto<Guid> input);
        Task<PagedResultDto<ProductDto>> GetAllProductsAsync(PagedProductResultRequestDto input);
        Task<ProductDto> UpdateProductAsync(UpdateProductDto input);
        Task<List<CommonKeyValuePairDto>> GetPartialProductsAsync(string keyword);
        Task<List<ProductSearchResultDto>> GetPartialProductsByTypesAsync(ProductSearchType type, string keyword);
        #endregion

        #region Warehouse
        Task<WarehouseDto> CreateWarehouseAsync(CreateWarehouseDto input);
        Task DeleteWarehouseAsync(EntityDto<Guid> input);
        Task<WarehouseDto> GetWarehouseAsync(EntityDto<Guid> input);
        Task<PagedResultDto<WarehouseDto>> GetAllWarehousesAsync(PagedWarehouseResultRequestDto input);
        Task<WarehouseDto> UpdateWarehouseAsync(UpdateWarehouseDto input);
        Task<List<CommonKeyValuePairDto>> GetAllKeyValuePairWarehousesAsync();
        #endregion

        #region Category
        Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto input);
        Task DeleteCategoryAsync(EntityDto<Guid> input);
        Task<CategoryDto> GetCategoryAsync(EntityDto<Guid> input);
        Task<PagedResultDto<CategoryDto>> GetAllCategoriesAsync(PagedCategoryResultRequestDto input);
        Task<CategoryDto> UpdateCategoryAsync(CategoryDto input);
        #endregion

        #region Brand
        Task<BrandDto> CreateBrandAsync(CreateBrandDto input);
        Task DeleteBrandAsync(EntityDto<Guid> input);
        Task<BrandDto> GetBrandAsync(EntityDto<Guid> input);
        Task<PagedResultDto<BrandDto>> GetAllBrandsAsync(PagedBrandsResultRequestDto input);
        Task<BrandDto> UpdateBrandAsync(BrandDto input);
        #endregion

        #region Stock Balance
        Task<ResponseDto<ProductStockBalanceDto>> GetStockBalancesByProductIdAsync(Guid productId);
        Task<ProductStockBalanceDto> GetRecentlyCreatedGoodsReceivedNoteAsync(Guid productId);

        #endregion
    }
}
