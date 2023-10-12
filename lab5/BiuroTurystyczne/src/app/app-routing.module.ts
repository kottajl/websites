import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TripAddComponent } from './trip-add/trip-add.component';
import { TripContainerComponent } from './trip-container/trip-container.component';
import { TripInfoComponent } from './trip-info/trip-info.component';

const routes: Routes = [
  { path: 'offer', component: TripContainerComponent},
  { path: 'add-trip', component: TripAddComponent },
  { path: 'trip-info/:id', component: TripInfoComponent},
  { path: 'basket', component: BasketComponent },
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
