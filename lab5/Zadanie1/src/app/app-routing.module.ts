import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhotoInfoComponent } from './photo-info/photo-info.component';
import { PhotosComponent } from './photos/photos.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'posts', component:PostsComponent },
  { path: 'photo/:id', component: PhotoInfoComponent },
  { path: 'photos', component: PhotosComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**',  component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
