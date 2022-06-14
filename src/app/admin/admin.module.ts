import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AdminComponent } from "./admin.component";
import { AuthGuard} from "./auth.guard";

/**
 * This is a dynamically loaded module, which is loaded thru the routing configuration.
 * this module should be placed in a package under the directory 'app'.
 * Dynamic modules are for features which are not meant for all users.
 */
let routing = RouterModule.forChild([
  { path: "auth", component: AuthComponent },
  { path: "main", component: AdminComponent },
  { path: "**", redirectTo: "auth", canActivate:[AuthGuard] }
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing, ReactiveFormsModule],
  declarations: [AuthComponent, AdminComponent],
  providers : [AuthGuard]
})
export class AdminModule { }
