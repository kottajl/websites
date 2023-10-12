import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../interfaces/ITrip';
import { Product } from '../interfaces/IProduct';
import { DbaseService } from '../services/dbase.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent {

  tripBasket: Array<Product>= [];
  tempTrips: Array<Trip>= [];
  sumQuantity: number= 0;
  sumCost: number= 0;
  currency: string= "";
  currencies: string[]= ["PLN", "€", "$"];

  basketColor= ["#00c400", "#ac0000"];
  basketColorIt: number= 1;

  constructor (private InputService: DbaseService) {}

  ngOnInit() {
    this.InputService.getTrips().subscribe(res => {
      this.tempTrips= res.filter((trip: Trip) => trip.maxQuantity > trip.remained);
      for (let trip of this.tempTrips) {
        this.tripBasket.push({
          tripInfo: trip,
          quantity: trip.maxQuantity - trip.remained,
          cost: (trip.maxQuantity - trip.remained) * trip.price
        } as Product);

        this.sumQuantity+= trip.maxQuantity - trip.remained;
        this.sumCost+= (trip.maxQuantity - trip.remained) * trip.price
      }
        
    });

    for (let item of this.tripBasket) {
      this.sumQuantity+= item.quantity;
      this.sumCost+= item.cost;
    }

    this.InputService.currentCurrency.subscribe(message => this.currency= message);
  }

  changeCurrency(newCurrency: string): void {
    this.InputService.setCurrency(newCurrency);
    this.InputService.changeCurrency(newCurrency);
  }
  
}
