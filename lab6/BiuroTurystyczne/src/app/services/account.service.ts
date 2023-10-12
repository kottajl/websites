import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  userData: Observable<any>;
  user: any;
  persistenceValue: string= "local";

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    // this.angularFireAuth.setPersistence(this.persistenceValue);
    this.userData= angularFireAuth.authState;

    this.userData.subscribe(res => this.user= res);
  }

  makeNewAccount(email: string, password: string): boolean {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['offer']);
      return true;
    }).catch((error) => alert(error));

    return false
  }

  signIn(email: string, password: string): void {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['offer']);
    }).catch((error) => alert(error));
  }

  signOut(): void {
    this.angularFireAuth.signOut();
    this.router.navigate(['home']);
  }

  isLoggedIn(): boolean {
    return this.user != null;
  }

  changePersistance(newValue: string): void {
    this.persistenceValue= newValue;
    this.angularFireAuth.setPersistence(this.persistenceValue);
  }


}
