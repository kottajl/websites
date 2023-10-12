import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { DbaseService } from '../services/dbase.service';
import { Trip } from '../interfaces/ITrip';
import { take } from 'rxjs';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})

export class TripRatingComponent {
  @Input() myId: number= -1;
  trip: Trip= {} as Trip;
  tripList: Array<Trip>= [];

  rateValueString: string= "N/D";
  starColors: Array<string>= ["starGrey", "starRed", "starOrange", "starYellow", "starLightGreen", "starGreen"];

  constructor(private service: DbaseService) {

    this.service.getTrips().subscribe(sub => {
      this.tripList= sub;
      this.trip= this.tripList.find(trip => trip.id == this.myId) as Trip;
    });

    setTimeout(() => {
      this.setStars(Math.round(this.getAvg()), false);
      if (this.trip.rateDenominator != 0)
        this.rateValueString= (this.trip.rateNumerator / this.trip.rateDenominator).toFixed(1);
    }, 200);

  }

  ngOnInit(): void {
  }

  private setStars(k: number, withHover: boolean): void {
    for (let it = 1; it <= 5; it++) {
      let myStar= document.getElementById("star" + this.trip.id + "-" + it) as HTMLImageElement;
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
    this.service.addOpinion(this.trip, k);
    setTimeout(() => {
      this.rateValueString= (this.trip.rateNumerator / this.trip.rateDenominator).toFixed(1);
    }, 80)     
  }

  mouseOn(k: number): void { 
    this.setStars(k, true);
  }

  mouseOut(): void { 
    this.setStars(Math.round(this.getAvg()), false); 
  }

}
