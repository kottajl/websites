import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-navbar',
  templateUrl: './account-navbar.component.html',
  styleUrls: ['./account-navbar.component.css']
})

export class AccountNavbarComponent {
  user: any;
  persistanceOptions: Array<string>= ["local", "session", "none"];

  constructor (public accService: AccountService) {
    this.accService.userData.subscribe(res => {
      this.user= res;
      // console.log("Zmiana user -> " + this.user);
    });

  }

  signOut(): void {
    this.accService.signOut();
  }

  changePersistance(newValue: string): void {
    this.accService.changePersistance(newValue);
  }

}
