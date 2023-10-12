import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripContainerComponent } from './trip-container/trip-container.component';
import { BasketComponent } from './basket/basket.component';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { TripAddComponent } from './trip-add/trip-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    TripContainerComponent,
    BasketComponent,
    TripRatingComponent,
    TripAddComponent,
    HomeComponent,
    NotFoundComponent,
    NavigationComponent,
    TripInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp( environment.firebaseConfig )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
