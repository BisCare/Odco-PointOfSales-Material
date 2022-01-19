import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { FinanceServiceProxy, InventorySalesProductDto, NonInventorySalesProductDto, SaleDto, SalesServiceProxy } from '@shared/service-proxies/service-proxies';

// Having combination of "InventorySalesProductDto" & "NonInventorySalesProductDto"
class SalesProduct {
  id: string;
  sequenceNumber: number;

  saleId: string;
  salesNumber: string;

  productId: string;
  productCode: string;
  productName: string;

  warehouseCode: string;
  warehouseId: string;
  warehouseName: string;

  quantity: number;

  sellingPrice: number;
  price: number;

  discountAmount: number;
  discountRate: number;
  lineTotal: number;

  remarks: string;
  isActive: boolean;

  isInventorySalesProduct: boolean; // "InventorySalesProductDto" => true, "NonInventorySalesProductDto" => false

}

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss'],
  animations: [appModuleAnimation()],
})
export class SalesDetailsComponent extends AppComponentBase implements OnInit {
  saleId: string;
  salesProducts: SalesProduct[] = [];

  constructor(
    injector: Injector,
    private _financeService: FinanceServiceProxy,
    private _salesService: SalesServiceProxy,
    private router: Router,
    private route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
    this.saleId = this.route.snapshot.queryParamMap.get("salesId");

    if (this.isNullOrEmptyString(this.saleId)) {
      this.notify.error(this.l("NoSaleIdIsAvailable"));
    } else {
      this.getSaledetails();
    }
  }

  getSaledetails() {
    this._salesService.getSales(this.saleId).subscribe((result: SaleDto) => {
      console.log(result);

      result.inventorySalesProducts.forEach((isp: InventorySalesProductDto) => {
        let obj = new SalesProduct();

        obj.id = isp.id;
        obj.sequenceNumber = isp.sequenceNumber;
        obj.saleId = isp.saleId;
        obj.salesNumber = isp.salesNumber;
        obj.productId = isp.productId;
        obj.productCode = isp.code;
        obj.productName = isp.name;
        obj.warehouseCode = isp.warehouseCode;
        obj.warehouseId = isp.warehouseId;
        obj.warehouseName = isp.warehouseName;
        obj.quantity = isp.quantity;
        obj.sellingPrice = isp.sellingPrice;
        obj.price = isp.price;
        obj.discountAmount = isp.discountAmount;
        obj.discountRate = isp.discountRate;
        obj.lineTotal = isp.lineTotal;
        obj.remarks = isp.remarks;
        obj.isActive = isp.isActive;
        obj.isInventorySalesProduct = true;

        this.salesProducts.push(obj);
      });

      result.nonInventorySalesProducts.forEach((isp: NonInventorySalesProductDto) => {
        let obj = new SalesProduct();

        obj.id = isp.id;
        obj.sequenceNumber = isp.sequenceNumber;
        obj.saleId = isp.saleId;
        obj.salesNumber = isp.salesNumber;
        obj.productId = isp.productId;
        obj.productCode = isp.productCode;
        obj.productName = isp.productName;
        obj.warehouseCode = isp.warehouseCode;
        obj.warehouseId = isp.warehouseId;
        obj.warehouseName = isp.warehouseName;
        obj.quantity = isp.quantity;
        obj.sellingPrice = isp.sellingPrice;
        obj.price = isp.price;
        obj.discountAmount = isp.discountAmount;
        obj.discountRate = isp.discountRate;
        obj.lineTotal = isp.lineTotal;
        obj.remarks = null;
        obj.isActive = true;
        obj.isInventorySalesProduct = false;

        this.salesProducts.push(obj);
      });

      this.salesProducts.sort(x => x.sequenceNumber);
      console.log(this.salesProducts);

    });
  }

}
