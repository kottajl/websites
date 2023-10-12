import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripContainerComponent } from './trip-container/trip-container.component';
import { BasketComponent } from './basket/basket.component';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { TripAddComponent } from './trip-add/trip-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TripContainerComponent,
    BasketComponent,
    TripRatingComponent,
    TripAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
