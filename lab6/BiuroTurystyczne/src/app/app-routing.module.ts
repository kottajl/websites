import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { TripAddComponent } from './trip-add/trip-add.component';
import { TripContainerComponent } from './trip-container/trip-container.component';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthLoggedGuard } from './guard/auth-logged.guard';

const routes: Routes = [
  { path: 'offer', component: TripContainerComponent },
  { path: 'add-trip', component: TripAddComponent, canActivate: [AuthGuard] },
  { path: 'trip-info/:id', component: TripInfoComponent },
  { path: 'basket', component: BasketComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthLoggedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthLoggedGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
