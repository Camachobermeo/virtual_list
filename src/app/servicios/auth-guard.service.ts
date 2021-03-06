import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

    private menuC$ = new Subject<boolean>();

    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
        if (this.hayToken()) {
            // if (this.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }

    getMenuCambio$(): Observable<boolean> {
        return this.menuC$.asObservable();
    }

    getMenus(): any {
        this.menuC$.next(true);
    };

    hayToken(): boolean {
        let objJWT = this.getObjetoJWT();
        if (objJWT !== null) {
            return true;
        } else {
            return false;
        }
    };

    getObjetoJWT() {
        let dataJWT: string = localStorage.getItem("codigo");
        if (dataJWT) {
            let objJWT = JSON.parse(localStorage.getItem("tiempo"));
            return objJWT;
        } else {
            return null;
        }
    };

}
