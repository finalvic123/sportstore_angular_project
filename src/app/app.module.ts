import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {StoreModule} from "../store/store.module";
import {RouterModule} from "@angular/router";
import {StoreComponent} from "../store/store.component";
import {CartDetailComponent} from "../store/cartDetail.component";
import {CheckoutComponent} from "../store/checkout.component";
import {StoreFirstGuard} from "../store/storeFirst.guard";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule,
    RouterModule.forRoot([
      {
        path: "store", component: StoreComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: "cart", component: CartDetailComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: "checkout", component: CheckoutComponent,
        canActivate: [StoreFirstGuard]
      },
      /**
       * de admin komt dan voor de url te staan : admin/main
       */
      {
        path: "admin",
        loadChildren: () => import("./admin/admin.module")
          .then(m => m.AdminModule),
        canActivate: [StoreFirstGuard]
      },
      {path: "**", redirectTo: "/store"}
    ]),
    ReactiveFormsModule
  ],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
