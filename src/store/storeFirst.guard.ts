import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {StoreComponent} from "./store.component";

/**
 * Codewise you think you could remove firstNavigation, but this is not the case.
 * Without it the routing in the application breaks.
 */
@Injectable()
export class StoreFirstGuard {
  private firstNavigation = true;

  constructor(private router : Router) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
    if(this.firstNavigation) {
      this.firstNavigation = false;
      if(route.component != StoreComponent) {
        this.router.navigateByUrl("/");
        return false;
      }
    }
    return true;
  }
}
