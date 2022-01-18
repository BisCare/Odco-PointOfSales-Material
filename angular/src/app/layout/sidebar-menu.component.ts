import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  Router,
  RouterEvent,
  NavigationEnd,
  PRIMARY_OUTLET,
} from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { MenuItem } from "@shared/layout/menu-item";
import { result } from "lodash-es";

@Component({
  selector: "sidebar-menu",
  templateUrl: "./sidebar-menu.component.html",
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
  menuItems: MenuItem[];
  menuItemsMap: { [key: number]: MenuItem } = {};
  activatedMenuItems: MenuItem[] = [];
  routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
  homeRoute = "/app/about";

  constructor(injector: Injector, private router: Router) {
    super(injector);
    this.router.events.subscribe(this.routerEvents);
  }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems();
    this.patchMenuItems(this.menuItems);
    this.routerEvents
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentUrl = event.url !== "/" ? event.url : this.homeRoute;
        const primaryUrlSegmentGroup =
          this.router.parseUrl(currentUrl).root.children[PRIMARY_OUTLET];
        if (primaryUrlSegmentGroup) {
          this.activateMenuItems("/" + primaryUrlSegmentGroup.toString());
        }
      });
  }

  getMenuItems(): MenuItem[] {
    return [
      new MenuItem(this.l("About"), "/app/about", "info"),
      new MenuItem(this.l("HomePage"), "/app/home", "home"),
      new MenuItem(
        this.l("Roles"),
        "/app/roles",
        "verified_user",
        "Pages.Roles"
      ),
      new MenuItem(
        this.l("Tenants"),
        "/app/tenants",
        "account_balance",
        "Pages.Tenants"
      ),
      new MenuItem(
        this.l("Users"),
        "/app/users",
        "supervised_user_circle",
        "Pages.Users"
      ),
      new MenuItem(this.l("Products"), "", "verified_user", "", [
        new MenuItem(
          this.l("Products"),
          "/app/products",
          "shopping_cart",
          "Pages.Users"
        ),
        new MenuItem(
          this.l("Categories"),
          "/app/categories",
          "bookmarks",
          "Pages.Users"
        ),
        new MenuItem(
          this.l("Brands"),
          "/app/brands",
          "change_history",
          "Pages.Users"
        ),
      ]),
      new MenuItem(
        this.l("Suppliers"),
        "/app/suppliers",
        "manage_accounts",
        "Pages.Users"
      ),
      new MenuItem(
        this.l("PurchaseOrders"),
        "/app/create-purchase-orders",
        "add_shopping_cart",
        "Pages.Users"
      ),
      new MenuItem(
        this.l("InventoryTransactions"),
        "/app/inventory-transactions",
        "add_shopping_cart",
        "Pages.Users"
      ),
      new MenuItem(
        this.l("InventoryTransactions"),
        "/app/create-inventory-transactions",
        "add_shopping_cart",
        "Pages.Users"
      ),
      new MenuItem(
        this.l("Sales"),
        "/app/sales",
        "add_shopping_cart",
        "Pages.Users"
      ),
      new MenuItem(
        this.l("Sales"),
        "/app/sales-list",
        "add_shopping_cart",
        "Pages.Users"
      ),
      new MenuItem(
        this.l("Payment"),
        "/app/create-customer-outstanding-payment",
        "add_shopping_cart",
        "Pages.Users"
      ),
      new MenuItem(
        this.l("Payments"),
        "/app/payments",
        "add_shopping_cart",
        "Pages.Users"
      ),
      new MenuItem(this.l("MultiLevelMenu"), "", "verified_user", "", [
        new MenuItem("ASP.NET Boilerplate", "", "verified_user", "", [
          new MenuItem(
            "Home",
            "https://aspnetboilerplate.com?ref=abptmpl",
            ""
          ),
          new MenuItem(
            "Templates",
            "https://aspnetboilerplate.com/Templates?ref=abptmpl",
            ""
          ),
          new MenuItem(
            "Samples",
            "https://aspnetboilerplate.com/Samples?ref=abptmpl",
            ""
          ),
          new MenuItem(
            "Documents",
            "https://aspnetboilerplate.com/Pages/Documents?ref=abptmpl",
            ""
          ),
        ]),
        new MenuItem("ASP.NET Zero", "", "verified_user", "", [
          new MenuItem(
            "Home",
            "https://aspnetzero.com?ref=abptmpl",
            ""
          ),
          new MenuItem(
            "Features",
            "https://aspnetzero.com/Features?ref=abptmpl",
            ""
          ),
          new MenuItem(
            "Pricing",
            "https://aspnetzero.com/Pricing?ref=abptmpl#pricing",
            ""
          ),
          new MenuItem(
            "Faq",
            "https://aspnetzero.com/Faq?ref=abptmpl",
            ""
          ),
          new MenuItem(
            "Documents",
            "https://aspnetzero.com/Documents?ref=abptmpl",
            ""
          ),
        ]),
      ]),
    ];
  }

  patchMenuItems(items: MenuItem[], parentId?: number): void {
    items.forEach((item: MenuItem, index: number) => {
      item.id = parentId ? Number(parentId + "" + (index + 1)) : index + 1;
      if (parentId) {
        item.parentId = parentId;
      }
      if (parentId || item.children) {
        this.menuItemsMap[item.id] = item;
      }
      if (item.children) {
        this.patchMenuItems(item.children, item.id);
      }
    });
  }

  activateMenuItems(url: string): void {
    this.deactivateMenuItems(this.menuItems);
    this.activatedMenuItems = [];
    const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
    foundedItems.forEach((item) => {
      this.activateMenuItem(item);
    });
  }

  deactivateMenuItems(items: MenuItem[]): void {
    items.forEach((item: MenuItem) => {
      item.isActive = false;
      item.isCollapsed = true;
      if (item.children) {
        this.deactivateMenuItems(item.children);
      }
    });
  }

  findMenuItemsByUrl(
    url: string,
    items: MenuItem[],
    foundedItems: MenuItem[] = []
  ): MenuItem[] {
    items.forEach((item: MenuItem) => {
      if (item.route === url) {
        foundedItems.push(item);
      } else if (item.children) {
        this.findMenuItemsByUrl(url, item.children, foundedItems);
      }
    });
    return foundedItems;
  }

  activateMenuItem(item: MenuItem): void {
    item.isActive = true;
    if (item.children) {
      item.isCollapsed = false;
    }
    this.activatedMenuItems.push(item);
    if (item.parentId) {
      this.activateMenuItem(this.menuItemsMap[item.parentId]);
    }
  }

  isMenuItemVisible(item: MenuItem): boolean {
    if (!item.permissionName) {
      return true;
    }
    return this.permission.isGranted(item.permissionName);
  }
}
