import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioProvider } from "../providers/Usuario.provider";

@Injectable({
    providedIn: "root"
})
export class LoginGuard implements CanActivate {
    constructor(private provider: UsuarioProvider, private router: Router){
    }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log(this.provider.isLogged());
          if(!this.provider.isLogged())
          {
              return this.router.navigate(['/login']).then(() => false);
          }
        return true;
    }
    
  }