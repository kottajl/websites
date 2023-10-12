import { Component, Input, Output, EventEmitter } from '@angular/core';

type Trip = {
  index: number;

  name: string;
  country: string;
  startDate: string;
  endDate: string;
  price: number;
  maxQuantity: number;
  remained: number;
  description: string;
  imgLink: string;

  rateNumerator: number;
  rateDenominator: number;
};

@Component({
  selector: 'app-trip-container',
  templateUrl: './trip-container.component.html',
  styleUrls: ['./trip-container.component.css']
})

export class TripContainerComponent {
  input: Array<any>= require("../../assets/trips.json");
  trips: Array<Trip>= [];
  basket: Array<Trip>= [];
  tripsInBasket: number= 0;
  nextIndex: number= 1;

  @Input() addTripToBasket= (trip: Trip) => {};
  @Input() removeTripFromBasket= (trip: Trip) => {};
  @Output() addNewTripEvent= new EventEmitter<any>();

  ngOnInit(): void {
    this.input= require("../../assets/trips.json");
    for(let i in this.input) {
      this.trips.push({
        index: this.nextIndex++,

        name: this.input[i]["name"],
        country: this.input[i]["country"],
        startDate: this.input[i]["startDate"],
        endDate: this.input[i]["endDate"],
        price: this.input[i]["price"],
        maxQuantity: this.input[i]["maxQuantity"],
        remained: this.input[i]["maxQuantity"],
        description: this.input[i]["description"],
        imgLink: "../../assets/images" + this.input[i]["imgLink"],

        rateNumerator: this.input[i]["rateNumerator"],
        rateDenominator: this.input[i]["rateDenominator"]
      } as Trip)
    }
    this.addNewTripEvent.emit(this.addNewTrip);
  }

  minPrice(): number {
    return Math.min(...this.trips.map(trip => trip.price));
  }
  maxPrice(): number {
    return Math.max(...this.trips.map(trip => trip.price));
  }

  addTrip(myTrip: Trip): void {
    let it= this.trips.findIndex(trip => trip === myTrip);
    this.trips[it].remained--;
    this.tripsInBasket++;
    this.addTripToBasket(myTrip);
  }
  removeTrip(myTrip: Trip): void {
    let it= this.trips.findIndex(trip => trip === myTrip);
    this.trips[it].remained++;
    this.tripsInBasket--;
    this.removeTripFromBasket(myTrip);
  }

  addNewTrip= (trip: Trip): void => {
    trip.index= this.nextIndex++;
    this.trips.push(trip); 
  };

  // (permanent delete)
  deleteTrip(tripToDelete: Trip): void {
    let numOfChosen= tripToDelete.maxQuantity - tripToDelete.remained;
    this.tripsInBasket-= numOfChosen;
    this.trips= this.trips.filter(trip => trip !== tripToDelete);
    while (numOfChosen--)
      this.removeTripFromBasket(tripToDelete);
  }

}
