import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {AdminComponent} from "./admin.component";
import {AuthGuard} from "./auth.guard";
import {ProductEditorComponent} from "./productEditor.component";
import {ProductTableComponent} from "./productTable.component";
import {OrderTableComponent} from "./orderTable.component";

/**
 * This is a dynamically loaded module, which is loaded thru the routing configuration.
 * This module should be placed in a package under the directory 'app'.
 * Dynamic modules are for features which are not meant for all users.
 */
let routing = RouterModule.forChild([
  {path: "auth", component: AuthComponent},
  {
    path: "main", component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {path: "products/:mode/:id", component: ProductEditorComponent},
      {path: "products/:mode", component: ProductEditorComponent},
      {path: "products", component: ProductTableComponent},
      {path: "orders", component: OrderTableComponent},
      {path: "**", redirectTo: "products"}
    ]
  },
  {path: "**", redirectTo: "auth"}
]);

@NgModule({
  imports: [CommonModule,
    FormsModule,
    routing,
    ReactiveFormsModule],
  declarations: [AuthComponent,
    AdminComponent,
    ProductTableComponent,
    ProductEditorComponent,
    OrderTableComponent],
  providers: [AuthGuard]
})
export class AdminModule {
}
