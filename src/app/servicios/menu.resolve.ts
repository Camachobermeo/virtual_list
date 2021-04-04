import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class MenuResolve implements Resolve<any> {
  
  constructor(private auth: AuthGuardService) {}
  
  resolve(route: ActivatedRouteSnapshot) {
    this.auth.getMenus();
  }
}