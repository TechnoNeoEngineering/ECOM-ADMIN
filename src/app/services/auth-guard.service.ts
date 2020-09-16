import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, public storage: Storage) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {


    let authInfo = {
      authenticated: false
    };
    this.storage.get('logged').then(k => {

      if (k === 'true') {
        authInfo.authenticated = true;
      } else {
        authInfo.authenticated = false;
      }

      if (!authInfo.authenticated) {

        this.router.navigate(['login']);
        return false;
      }

      return true;
    });
    return true;
  }

}
