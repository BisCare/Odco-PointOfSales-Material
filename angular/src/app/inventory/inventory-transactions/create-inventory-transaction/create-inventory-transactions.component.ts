import { Component, OnInit, Injector } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { AppComponentBase } from "@shared/app-component-base";
import {
  InventoryServiceProxy,
  ProductionServiceProxy,
  CreateGoodsReceivedDto,
  CreateGoodsReceivedProductDto,
  CommonKeyValuePairDto,
  DocumentSequenceNumberManagerImplementationServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { forEach as _forEach, map as _map } from "lodash-es";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { MatTableDataSource } from "@angular/material/table";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-create-inventory-transactions",
  templateUrl: "./create-inventory-transactions.component.html",
  styleUrls: ["./create-inventory-transactions.component.scss"],
  animations: [appModuleAnimation()],
})
export class CreateInventoryTransactionsComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  warehouses: CommonKeyValuePairDto[];
  displayedColumns: string[] = ["product-name"];
  // LINE_LEVEL_DATA: FormGroup[] = [];
  // dataSource = new MatTableDataSource<FormGroup>(this.LINE_LEVEL_DATA);
  //LINE_LEVEL_DATA: CreateGoodsReceivedProductDto[] = [];
  dataSource = new MatTableDataSource<AbstractControl>();
  grnForm = this.fb.group({
    goodsReceivedNumber: [null, Validators.required],
    referenceNumber: [null, Validators.maxLength(10)],
    supplierId: [null, Validators.required],
    supplierCode: [null, Validators.required],
    supplierName: [null, Validators.required],
    discountRate: [0, Validators.required],
    discountAmount: [0, Validators.required],
    taxRate: [0, Validators.required],
    taxAmount: [0, Validators.required],
    grossAmount: [0, Validators.required],
    netAmount: [0, Validators.required],
    transactionStatus: [1],
    remarks: [null],
    goodsReceivedProducts: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    injector: Injector,
    private _productionService: ProductionServiceProxy,
    private _inventoryService: InventoryServiceProxy,
    private _documentService: DocumentSequenceNumberManagerImplementationServiceProxy
  ) {
    super(injector);
  }

  initItemRows() {
    return this.fb.group({
      goodsRecievedNumber: [null, Validators.required],
      sequenceNumber: [0, Validators.required],
      productId: [null, Validators.required],
      productCode: [null, Validators.required],
      productName: [null, Validators.required],
      warehouseId: [null, Validators.required],
      warehouseCode: [null, Validators.required],
      warehouseName: [null, Validators.required],
      expiryDate: [null],
      batchNumber: [null],
      quantity: [0, Validators.required],
      freeQuantity: [0, Validators.required],
      costPrice: [0, Validators.required],
      sellingPrice: [0, Validators.required],
      maximumRetailPrice: [0, Validators.required],
      discountRate: [0, Validators.required],
      discountAmount: [0, Validators.required],
      lineTotal: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllWarehouses();
    this._documentService.getNextDocumentNumber(2).subscribe((result) => {
      //this.grn.goodsReceivedNumber = result;
    });
    // this.grn.grossAmount = 0.0;
    // this.grn.taxRate = 0.0;
    // this.grn.taxAmount = 0.0;
    // this.grn.discountRate = 0.0;
    // this.grn.discountAmount = 0.0;
    // this.grn.netAmount = 0.0;
  }

  getAllWarehouses() {
    this._productionService
      .getAllKeyValuePairWarehouses()
      .subscribe((result) => (this.warehouses = result));
  }

  selectWarehouse($event, lineLevelDto: CreateGoodsReceivedProductDto) {
    let warehouseId = $event.target.value;
    let objWarehouse = new CommonKeyValuePairDto();

    if (warehouseId) {
      objWarehouse = this.warehouses.find((x) => x.id == warehouseId);
    }
    // set value for warehouse
    lineLevelDto.warehouseId = !objWarehouse.id ? null : objWarehouse.id;
    lineLevelDto.warehouseCode = !objWarehouse.id ? null : objWarehouse.code;
    lineLevelDto.warehouseName = !objWarehouse.id ? null : objWarehouse.name;
  }

  selectedSupplier($event: CommonKeyValuePairDto) {
    this.supplierId.setValue(!$event.id ? null : $event.id);
    this.supplierCode.setValue(!$event.code ? null : $event.code);
    this.supplierName.setValue(!$event.name ? null : $event.name);

    console.log(this.grnForm);
  }

  isProductExist(productId): boolean {
    // var lineLevelProduct = this.LINE_LEVEL_DATA.find(
    //   (p) => p.productId == productId
    // );
    // if (!lineLevelProduct) {
    //   return false;
    // }
    // this.notify.info(this.l("ProductIsAlreadyExist"));
    // return true;
    return false;
  }

  selectedProducts($event: CommonKeyValuePairDto) {
    if (!this.isProductExist($event.id)) {
      // let l = new CreateGoodsReceivedProductDto();
      // l.goodsRecievedNumber = null;
      // l.sequenceNumber = this.goodsReceivedProducts.length + 1;
      // l.productId = $event.id;
      // l.productCode = $event.code;
      // l.productName = $event.name;
      // l.warehouseId = null;
      // l.warehouseCode = null;
      // l.warehouseName = null;
      // l.expiryDate = null;
      // l.batchNumber = null;
      // l.quantity = 0;
      // l.freeQuantity = 0;
      // l.costPrice = 0;
      // l.sellingPrice = 0;
      // l.maximumRetailPrice = 0;
      // l.discountRate = 0;
      // l.discountAmount = 0;
      // l.lineTotal = 0;

      // this.goodsReceivedProducts.setValue();

      // this.grnForm.setControl(
      //   "goodsReceivedProducts",
      //   this.goodsReceivedProducts
      // );
      let x = this.fb.group({
        goodsRecievedNumber: [null, Validators.required],
        sequenceNumber: [0, Validators.required],
        productId: [$event.id, Validators.required],
        productCode: [$event.code, Validators.required],
        productName: [$event.name, Validators.required],
        warehouseId: [null, Validators.required],
        warehouseCode: [null, Validators.required],
        warehouseName: [null, Validators.required],
        expiryDate: [null],
        batchNumber: [null],
        quantity: [0, Validators.required],
        freeQuantity: [0, Validators.required],
        costPrice: [0, Validators.required],
        sellingPrice: [0, Validators.required],
        maximumRetailPrice: [0, Validators.required],
        discountRate: [0, Validators.required],
        discountAmount: [0, Validators.required],
        lineTotal: [0, Validators.required],
      });
      this.goodsReceivedProducts.push(x);
      this.dataSource.data.push(x);
      //this.goodsReceivedProducts.push(this.initItemRows());
      // this.dataSource.data.forEach((x) => {
      //   this.goodsReceivedProducts.push(x);
      // });
      console.log(this.grnForm);
      console.log(this.goodsReceivedProducts);
      return (this.dataSource.filter = "");
    }
  }

  updateLineLevelCalculations(grp: CreateGoodsReceivedProductDto) {
    // let _quantity = grp.quantity;
    // let _costPrice = parseFloat(grp.costPrice.toFixed(2));
    // let _lineTotal = _quantity * _costPrice;
    // let _discountRate = parseFloat(grp.discountRate.toFixed(2));
    // let _discountAmount = parseFloat(
    //   ((_lineTotal * _discountRate) / 100).toFixed(2)
    // );
    // grp.discountRate = _discountRate;
    // grp.discountAmount = _discountAmount;
    // grp.lineTotal = parseFloat((_lineTotal - _discountAmount).toFixed(2));
    // this.headerLevelCalculation();
  }

  calculateLineLevelTotal() {
    // let total = 0;
    // this.LINE_LEVEL_DATA.forEach(function (item) {
    //   total += item.lineTotal;
    // });
    // this.grn.grossAmount = parseFloat(total.toFixed(2));
    // return total.toFixed(2);
  }

  headerLevelCalculation() {
    // // (gross value + tax – discount)
    // let grossTotal = parseFloat(this.calculateLineLevelTotal());
    // let tax = parseFloat((grossTotal * (this.grn.taxRate / 100)).toFixed(2));
    // let discount = parseFloat(
    //   (grossTotal * (this.grn.discountRate / 100)).toFixed(2)
    // );
    // this.grn.discountAmount = discount;
    // this.grn.taxAmount = tax;
    // let netAmount = parseFloat((grossTotal + tax - discount).toFixed(2));
    // this.grn.netAmount = netAmount;
  }

  validateForm() {
    // this.errors = [];
    // if (!this.grn.supplierId) {
    //   this.errors.push(this.l("SupplierIsRequired!"));
    // }
    // if (this.LINE_LEVEL_DATA.length == 0) {
    //   this.errors.push(this.l("SelectAtleastOneProduct!"));
    // }
  }

  save() {
    // this.validateForm();
    // if (this.errors.length > 0) {
    //   return;
    // }
    // this.grn.goodsReceivedProducts = this.LINE_LEVEL_DATA;
    // this.saving = true;
    // const _grn = new CreateGoodsReceivedDto();
    // _grn.init(this.grn);
    // this._inventoryService
    //   .createGoodsReceivedNote(_grn)
    //   .pipe(
    //     finalize(() => {
    //       this.saving = false;
    //     })
    //   )
    //   .subscribe(() => {
    //     this.notify.info(this.l("SavedSuccessfully"));
    //   });
  }

  //#region Propertises
  get goodsReceivedNumber() {
    return this.grnForm.get("goodsReceivedNumber") as FormControl;
  }

  get referenceNumber() {
    return this.grnForm.get("referenceNumber") as FormControl;
  }

  get remarks() {
    return this.grnForm.get("remarks") as FormControl;
  }

  get supplierId() {
    return this.grnForm.get("supplierId") as FormControl;
  }

  get supplierCode() {
    return this.grnForm.get("supplierCode") as FormControl;
  }

  get supplierName() {
    return this.grnForm.get("supplierName") as FormControl;
  }

  get discountRate() {
    return this.grnForm.get("discountRate") as FormControl;
  }

  get discountAmount() {
    return this.grnForm.get("discountAmount") as FormControl;
  }

  get taxRate() {
    return this.grnForm.get("taxRate") as FormControl;
  }

  get taxAmount() {
    return this.grnForm.get("taxAmount") as FormControl;
  }

  get grossAmount() {
    return this.grnForm.get("grossAmount") as FormControl;
  }

  get netAmount() {
    return this.grnForm.get("netAmount") as FormControl;
  }

  get goodsReceivedProducts(): FormArray {
    return this.grnForm.get("goodsReceivedProducts") as FormArray;
  }
  //#endregion
}
