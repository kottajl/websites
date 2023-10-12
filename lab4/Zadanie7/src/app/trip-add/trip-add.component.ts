import { Component, Input } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css']
})
export class TripAddComponent {
  @Input() createTripInContainer= (trip: Trip) => {};

  ngOnInit() {
    let addButton= document.getElementById("adder");
    if (addButton != null)
      addButton.style.display= "block";

    let formDiv= document.getElementById("main");
    if (formDiv != null)
      formDiv.style.display= "none";
  }

  TheFormGroup: FormGroup= {} as FormGroup;
  constructor (fB: FormBuilder) {
    this.TheFormGroup= fB.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      country: [null, [Validators.required, Validators.pattern(/^\p{Lu}[\p{Lu}\p{Ll} -/]*$/mu)]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      description: [null, []],
      imgLink: [null, []]
    });
  }

  private writeInvalidity(): boolean {

    if (this.TheFormGroup.get("name")?.hasError("minLength")) {
      alert("Nazwa wycieczki jest za krótka!");
      return false;
    }
    if (this.TheFormGroup.get("country")?.hasError("pattern")) {
      alert("Błędna nazwa państwa (powinna zaczynać się od wielkiej litery oraz zawierać tylko litery, spacje oraz myślniki)");
      return false;
    }
    if (new Date(this.TheFormGroup.get("startDate")!.value) > new Date(this.TheFormGroup.get("endDate")!.value)) {
      alert("Wycieczka się kończy jeszcze przed jej rozpoczęciem...");
      return false;
    }
    if (this.TheFormGroup.get("price")?.hasError("min")) {
      alert("Cena powinna być liczbą nieujemną!");
      return false;
    }
    if (this.TheFormGroup.get("quantity")?.hasError("min") || this.TheFormGroup.get("quantity")!.value % 1 != 0) {
      alert("Ilość miejsc powinna być całkowitą liczbą nieujemną!");
      return false;
    }

    if (!this.TheFormGroup.valid) {
      alert("Brak potrzebnych danych!");
      return false;
    }

    return true;
  }

  private clearForm(): void {
    this.TheFormGroup.get("name")!.reset();
    this.TheFormGroup.get("country")!.reset();
    this.TheFormGroup.get("startDate")!.reset();
    this.TheFormGroup.get("endDate")!.reset();
    this.TheFormGroup.get("price")!.reset();
    this.TheFormGroup.get("quantity")!.reset();
    this.TheFormGroup.get("description")!.reset();
    this.TheFormGroup.get("imgLink")!.reset();
  }

  addTrip(): void {
    if (!this.writeInvalidity())
      return;

    let newTrip= {
      index: NaN,

      name: this.TheFormGroup.get("name")!.value,
      country: this.TheFormGroup.get("country")!.value,
      startDate: this.TheFormGroup.get("startDate")!.value,
      endDate: this.TheFormGroup.get("endDate")!.value,
      price: this.TheFormGroup.get("price")!.value,
      maxQuantity: this.TheFormGroup.get("quantity")!.value,
      remained: this.TheFormGroup.get("quantity")!.value,
      description: this.TheFormGroup.get("description")!.value,
      imgLink: this.TheFormGroup.get("imgLink")!.value,

      rateNumerator: 0,
      rateDenominator: 0
    } as Trip;

    if (newTrip.imgLink === null || true)
      newTrip.imgLink= "../../assets/images/no_photo.png";
    
    this.createTripInContainer(newTrip);
    this.clearForm();
    this.changeVisibility();
  }

  private oppositeVisibility (val: string): string {
    if (val == "block")
        return "none";
    
    return "block";
  }

  changeVisibility(): void {
    let addButton= document.getElementById("adder");
    if (addButton != null)
      addButton.style.display= this.oppositeVisibility(addButton.style.display);
    
    let formDiv= document.getElementById("main");
    if (formDiv != null)
      formDiv.style.display= this.oppositeVisibility(formDiv.style.display);
  }

}
