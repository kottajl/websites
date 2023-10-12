import { Component } from '@angular/core';
import { TripAddComponent } from './trip-add/trip-add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zadanie7';

  function1= (args: any): void => {};
  function2= (args: any): void => {};
  function3= (args: any): void => {};

  callAddTrip($event: any) {
    this.function1= $event;
  }
  callRemoveTrip($event: any) {
    this.function2= $event;
  }

  callAddNewTrip($event: any) {
    this.function3= $event;
  }

  ngOnInit() {
    let addButton= document.getElementById("linkToAdder");
    if (addButton != null)
      addButton.style.display= "block";
  }

  animateAdder(): void {
    let adder= document.getElementById("adder");
    if (adder != null) {
      adder.setAttribute("class", "flashyAdder");
      setTimeout(() => {
        if (adder != null)
          adder.setAttribute("class", "");
      }, 1050);
    }
  }

}
