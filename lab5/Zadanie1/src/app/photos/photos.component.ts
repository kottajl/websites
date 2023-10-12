import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})

export class PhotosComponent {
  constructor(private service: DataService) {}
  photosArray: any[]= [];

  ngOnInit(): void {
    this.service.getPhotos().subscribe(result => this.photosArray= result);
  }
}
