import { Component } from '@angular/core';
import { DbaseService } from '../services/dbase.service';
import { Trip } from '../interfaces/ITrip';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {
  tripsArray: Array<Trip>= [];
  tripsInBasket: number= 0;
  costOfBasket: number= 0;
  currency: string= "";

  constructor (private service: DbaseService, private accService: AccountService) {
    this.service.getTrips().subscribe((sub: any) => {
      this.tripsArray= sub
      this.tripsInBasket= 0;
      this.costOfBasket= 0;
      for (let trip of this.tripsArray) {
        this.tripsInBasket+= trip.maxQuantity - trip.remained;
        this.costOfBasket+= trip.price * (trip.maxQuantity - trip.remained);
      }
    });
    
    this.service.currentCurrency.subscribe(message => this.currency= message)

  }

  public getAccService(): any {
    return this.accService;
  }

}
