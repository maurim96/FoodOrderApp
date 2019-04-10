import { LoginService } from './login.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class RouteGuard implements CanActivate {

    constructor(private _loginService: LoginService,
                private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._loginService.isLoggedIn()) {
            return true;
        } else {
            this._router.navigateByUrl('login');
            return false;
        }
    }
}
