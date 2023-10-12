import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-photo-info',
  templateUrl: './photo-info.component.html',
  styleUrls: ['./photo-info.component.css']
})
export class PhotoInfoComponent {
  constructor(private route: ActivatedRoute, private service: DataService) {}
  photoItem: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.service.getPhoto(params['id']).subscribe(result => this.photoItem= result)
    });
  }
}
