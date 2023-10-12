import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Product } from '../interfaces/IProduct';
import { Trip } from '../interfaces/ITrip';
import { Feedback } from '../interfaces/IFeedback';

@Injectable({
  providedIn: 'root'
})

export class DbaseService {
  trips: Observable<any[]>;
  basketData: Observable<any[]>;
  basket: Array<Product>= [];
  
  feedbacks: Array<Feedback>= [];

  private currency: string= "PLN";
  private currencySource= new BehaviorSubject("PLN");
  currentCurrency= this.currencySource.asObservable();

  constructor(private db: AngularFireDatabase) {
    this.trips= this.db.list('Trips').valueChanges();
    this.basketData= this.db.list('Basketdata').valueChanges();
  }

  getTrips() {
    return this.trips;
  }

  getBasketData() {
    return this.basketData;
  }

  modifyRemained(trip: Trip, how: number) {
    this.db.list('Trips').snapshotChanges().pipe(take(1)).subscribe((sub: any) => {
      for (let item of sub)
        if (item.payload.val().id == trip.id)
          this.db.list('Trips').update(item.payload.key, {remained: (item.payload.val().remained + how)});
    });
  }

  addOpinion(trip: Trip, val: number) {
    this.db.list('Trips').snapshotChanges().pipe(take(1)).subscribe((sub: any) => {
      for (let item of sub)
        if (item.payload.val().id == trip.id)
          this.db.list('Trips').update(item.payload.key, {rateNumerator: item.payload.val().rateNumerator + val, rateDenominator: item.payload.val().rateDenominator + 1});
    });
  }

  deleteTrip(trip: Trip) {
    this.db.list('Trips').snapshotChanges().pipe(take(1)).subscribe((sub: any) => {
      for (let item of sub)
        if (item.payload.val().id == trip.id)
          this.db.list('Trips').remove(item.payload.key);
    });
  }

  addNewTrip(trip: Trip) {
    this.db.list('Trips').push(trip);
  }

  setCurrency(newCurrency: string): void {
    this.currency= newCurrency;
  }

  getCurrency(): string {
    return this.currency;
  }

  changeCurrency(newCurrency: string) {
    this.currencySource.next(newCurrency);
  }

  addFeedback(newFeedback: Feedback): void {
    this.feedbacks.push(newFeedback);
  }

  getFeedbacks(): Array<Feedback> {
    return this.feedbacks;
  }

}
