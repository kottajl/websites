import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbaseService } from '../services/dbase.service';
import { AccountService } from '../services/account.service';
import { Trip } from '../interfaces/ITrip';
import { Feedback } from '../interfaces/IFeedback';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})

export class TripInfoComponent {
  tripsList: Array<Trip>= [];
  myTrip: Trip= {} as Trip;
  myId: number= 0;
  photoIt: number= 0;
  currency: string= "";
  ngSelect: string= "";
  feedbacksList: Array<Feedback>= [];
  FeedbackFormGroup: FormGroup= {} as FormGroup;

  constructor (private route: ActivatedRoute, private service: DbaseService, private accSservice: AccountService, 
                private fb: FormBuilder, private router: Router) {
    this.route.params.subscribe(params => {
      this.myId= params["id"];
    });

    this.service.getTrips().subscribe((sub: any) => {
      this.tripsList= sub;
      this.myTrip= this.tripsList.find(trip => trip.id == this.myId) as Trip;
      this.ngSelect= this.myTrip.name;
    });

    this.FeedbackFormGroup= fb.group({
      nick: [null, [Validators.required]],
      tripName: [null, [Validators.required]],
      purchaseDate: [null, []],
      message: [null, [Validators.minLength(51), Validators.maxLength(499)]]
    });
  }

  ngOnInit(): void {
    let temp1= document.getElementById("btnLeft");
    let temp2= document.getElementById("btnRight");
    if (temp1 != null)
      temp1.textContent= "<";
    if (temp2 != null)
      temp2.textContent= ">";
    
    this.photoIt= 0;
    this.changePhoto(0);

    this.service.currentCurrency.subscribe(message => this.currency= message);
    this.feedbacksList= this.service.getFeedbacks();
  }

  addTrip(): void {
    if (!this.accSservice.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }

    this.service.modifyRemained(this.myTrip, -1);
  }

  removeTrip(): void {
    if (!this.accSservice.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }

    this.service.modifyRemained(this.myTrip, 1);
  }

  changePhoto (k: number): void {
    let photo= document.getElementById("infoPhoto");
    if (photo == null)
      return;
    
    this.photoIt= (this.photoIt + this.myTrip.photoLinks.length + k) % this.myTrip.photoLinks.length;

    photo.setAttribute("src", "../../assets/images/" + this.myTrip.photoLinks[this.photoIt]);
  }

  // formularz opinii

  private clearForm(): void {
    this.FeedbackFormGroup.get("nick")!.reset();
    this.FeedbackFormGroup.get("purchaseDate")!.reset();
    this.FeedbackFormGroup.get("message")!.reset();
  }

  private writeInvalidity(): boolean {

    if (this.FeedbackFormGroup.get("nick")!.value == null) {
      alert("Podaj nick!");
      return false;
    }

    if (this.FeedbackFormGroup.get("message")!.value == null) {
      alert("Brak treści opinii!");
      return false;
    }

    if (this.FeedbackFormGroup.get("message")!.value.length < 51 || this.FeedbackFormGroup.get("message")!.value.length > 499) {
      alert("Treść opinii nie mieści się w przedziale (50-500) znaków");
      return false;
    }

    return true;
  }

  addFeedback(): void {

    if (!this.writeInvalidity())
      return;

    let newFeedback= {
      nick: this.FeedbackFormGroup.get("nick")!.value,
      tripName: this.FeedbackFormGroup.get("tripName")!.value,
      purchaseDate: this.FeedbackFormGroup.get("purchaseDate")!.value,
      message: this.FeedbackFormGroup.get("message")!.value
    } as Feedback;

    if (newFeedback.tripName == null)
      newFeedback.tripName=this.ngSelect;

    if (newFeedback.nick == null)
      newFeedback.nick= "Anonymus";

    console.log(newFeedback);

    this.service.addFeedback(newFeedback);
    this.feedbacksList= this.service.getFeedbacks();
    this.clearForm();
  }

  public getAccSservice(): any {
    return this.accSservice;
  }

}
