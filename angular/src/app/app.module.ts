import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientJsonpModule } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { SharedModule } from "@shared/shared.module";
import { HomeComponent } from "@app/home/home.component";

import { MaterialModule } from "../shared/material/material.module";

// tenants
import { TenantModule } from "./tenants/tenant.module";
// roles
import { RoleModule } from "./roles/role.module";
// users
import { UserModule } from "./users/user.module";
// product
import { ProductModule } from "./productions/products/product.module";
// category
import { CategoryModule } from "./productions/categories/category.module";
// brand
import { BrandModule } from "./productions/brands/brand.module";
// supplier
import { SupplierModule } from "./purchasings/suppliers/supplier.module";
// purchase-order
import { PurchaseOrderModule } from "./purchasings/purchase-orders/purchase-order.module";
// inventory-transaction
import { InventoryTransactionModule } from "./inventory/inventory-transactions/inventory-transaction.module";
// sales
import { SaleModule } from "./sales/sale.module";
// payments
import { PaymentModule } from "./payments/payment.module";
// layout
import { HeaderComponent } from "./layout/header.component";
import { HeaderLeftNavbarComponent } from "./layout/header-left-navbar.component";
import { HeaderLanguageMenuComponent } from "./layout/header-language-menu.component";
import { HeaderUserMenuComponent } from "./layout/header-user-menu.component";
import { FooterComponent } from "./layout/footer.component";

import { SidebarMenuComponent } from "./layout/sidebar-menu.component";
import { NavComponent } from "./layout/nav.component";
import { LayoutModule } from "@angular/cdk/layout";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarMenuComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    ServiceProxyModule,
    MaterialModule,
    SharedModule,
    LayoutModule,
    UserModule,
    RoleModule,
    TenantModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    SupplierModule,
    PurchaseOrderModule,
    InventoryTransactionModule,
    SaleModule,
    PaymentModule
  ],
  providers: [],
  entryComponents: [],
})
export class AppModule { }
