import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

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
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})

export class TripRatingComponent {
  @Input() trip: Trip= {} as Trip;
  rateValueString: string= "N/D";
  starColors: Array<string>= ["starGrey", "starRed", "starOrange", "starYellow", "starLightGreen", "starGreen"];

  ngOnInit(): void {
    if (this.trip.rateDenominator != 0)
      this.rateValueString= (this.trip.rateNumerator / this.trip.rateDenominator).toFixed(1);

    setTimeout(() => this.setStars(Math.round(this.getAvg()), false), 50);
  }

  private setStars(k: number, withHover: boolean): void {
    for (let it = 1; it <= 5; it++) {
      let myStar= document.getElementById("star" + this.trip.index + "-" + it) as HTMLImageElement;
      if (myStar != null) {
        if (it <= k)
          myStar.setAttribute("src", "../../assets/icons/star_filled.png");
        else
          myStar.setAttribute("src", "../../assets/icons/star_empty.png");
      }

      if (withHover)
        myStar.setAttribute("class", "starBlack");
      else
        myStar.setAttribute("class", this.starColors[k]);
    }
  }

  private getAvg(): number {
    if (this.trip.rateDenominator === 0)
      return 0;
    
    return this.trip.rateNumerator / this.trip.rateDenominator;
  }

  addRate (k: number): void {
    this.trip.rateNumerator+= k;
    this.trip.rateDenominator++;
    this.rateValueString= (this.trip.rateNumerator / this.trip.rateDenominator).toFixed(1);
  }

  mouseOn(k: number): void { this.setStars(k, true); }

  mouseOut(): void { this.setStars(Math.round(this.getAvg()), false); }

}
