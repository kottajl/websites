import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title= "Zadanie5";
  data: Array <any>= require("../assets/data.json");
  brands: Array <any>= [];
  models: Array <any>= [];
  colours: Array <any>= [];

  myBrand= "<none>";
  myModel= "<none>";
  myColour= "<none>";

  ngOnInit(): void {
    this.brands= this.data.map(product => product.brand);
    this.brands= [...new Set(this.brands)];
  }


  changeBrand(chosenBrand: string): void {
    this.myBrand= chosenBrand;
    this.models= [];
    this.models= this.data.filter(product => product.brand === this.myBrand).map(product => product.model);
    this.changeModel(this.data.filter(product => product.brand === this.myBrand).map(product => product.model)[0])
  }

  
  changeModel(chosenModel: string): void {
    this.myModel= chosenModel;
    this.colours= this.data.filter(product => product.brand === this.myBrand && product.model === this.myModel).map(product => product.color)[0];
    var e = document.getElementsByName("colour")[0] as HTMLSelectElement;
    setTimeout(() => this.changeColour(e.options[e.selectedIndex].text), 20);
  }

  changeColour(chosenColour: string): void {
    this.myColour= chosenColour;
  }
}
