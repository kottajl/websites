import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DbaseService } from '../services/dbase.service';
import { Trip } from '../interfaces/ITrip';
import { Product } from '../interfaces/IProduct';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@Component({
  selector: 'app-trip-container',
  templateUrl: './trip-container.component.html',
  styleUrls: ['./trip-container.component.css']
})

export class TripContainerComponent {
  // input: Array<any>= [];
  trips: Array<Trip>= [];
  basket: Array<Trip>= [];
  tripBasket: Array<Product>= [];
  basketInfo: Array<any>= [];
  tripsInBasket: number= 0;
  currency: string= "";

  constructor (private inputService: DbaseService) {
    this.inputService.getTrips().subscribe((sub: any) => {
      this.trips= sub
      this.tripsInBasket= 0;
      for (let trip of this.trips)
        this.tripsInBasket+= trip.maxQuantity - trip.remained;
    });

    this.inputService.getBasketData().subscribe((sub: any) => this.basketInfo= sub);
  }

  ngOnInit(): void {
    this.inputService.currentCurrency.subscribe(message => this.currency= message);
  }

  minPrice(): number {
    return Math.min(...this.trips.map(trip => trip.price));
  }
  maxPrice(): number {
    return Math.max(...this.trips.map(trip => trip.price));
  }


  // Przyciski (+) i (-)

  addTrip(myTrip: Trip): void {
    console.log(this.trips.length);
    // this.tripsInBasket++;
    this.inputService.modifyRemained(myTrip, -1);
    this.addToBasket(myTrip);
    // this.inputService.changeNumInBasket(1);
  }
  removeTrip(myTrip: Trip): void {
    this.inputService.modifyRemained(myTrip, 1);
  }

  // -----

  // (permanent delete)
  deleteTrip(tripToDelete: Trip): void {
    this.inputService.deleteTrip(tripToDelete);
  }


  getRate(trip: Trip): string {
    if (trip.rateDenominator === 0)
      return "N/D";
    
      return (trip.rateNumerator / trip.rateDenominator).toFixed(1) + " ★ / 5.0 ★";
  }
  // Przeniesione z koszyka

  private addToBasket= (trip: Trip): void => {
    let it= this.tripBasket.map(el => el.tripInfo).findIndex(el => el === trip);
    if (it === -1) {
      // alert("Jeszce nie ma w koszyku");
      this.tripBasket.push({
        tripInfo: trip,
        quantity: 1,
        cost: trip.price
      } as Product);
    }
    else {
      // alert("Jest, a więc zwiększam");
      this.tripBasket[it].quantity++;
      this.tripBasket[it].cost+= trip.price;
    }
  }

  private removeFromBasket= (trip: Trip): void => {
    let it= this.tripBasket.map(el => el.tripInfo).findIndex(el => el === trip);
    this.tripBasket[it].quantity--;
    this.tripBasket[it].cost-= trip.price;
    if (this.tripBasket[it].quantity === 0)
      this.tripBasket= this.tripBasket.filter(el => el.tripInfo !== trip);
  }

}
