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
type Product = {
  tripInfo: Trip;
  quantity: number;
  cost: number;
};

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent {
  @Output() addTripEvent= new EventEmitter<any>();
  @Output() removeTripEvent= new EventEmitter<any>();
  tripBasket: Array<Product>= [];
  sumQuantity: number= 0;
  sumCost: number= 0;

  basketColor= ["#00c400", "#ac0000"];
  basketColorIt: number= 1;

  ngOnInit() {
    this.addTripEvent.emit(this.addToBasket);
    this.removeTripEvent.emit(this.removeFromBasket);

    let help= document.getElementById("help");
      if (help != null)
        help.style.display= "block";
    
    this.changeIconColor();
  }

  addToBasket= (trip: Trip): void => {
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

    this.sumQuantity++;
    this.sumCost+= trip.price;
  }

  removeFromBasket= (trip: Trip): void => {
    let it= this.tripBasket.map(el => el.tripInfo).findIndex(el => el === trip);
    this.tripBasket[it].quantity--;
    this.tripBasket[it].cost-= trip.price;
    if (this.tripBasket[it].quantity === 0)
      this.tripBasket= this.tripBasket.filter(el => el.tripInfo !== trip);
    
    this.sumQuantity--;
    this.sumCost-= trip.price;
  }

  private oppositeVisibility (val: string): string {
    if (val == "block")
        return "none";
    
    return "block";
  }

  private changeIconColor (): void {
    this.basketColorIt= (this.basketColorIt + 1) % 2;
    let icon= document.getElementById("basket");
    if (icon != null) 
      icon.style.backgroundColor= this.basketColor[this.basketColorIt];
  }

  basketAction(): void {
    let description= document.getElementById("infoContainer");
    if (description != null)
      description.style.display= this.oppositeVisibility(description.style.display);

    let help= document.getElementById("help");
    if (help != null)
      help.style.display= this.oppositeVisibility(help.style.display);
      
    let addButton= document.getElementById("linkToAdder");
    if (addButton != null)
      addButton.style.display= this.oppositeVisibility(addButton.style.display);

    this.changeIconColor();
  }
}
