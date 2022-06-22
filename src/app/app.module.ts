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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
