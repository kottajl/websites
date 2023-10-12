import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServService {

  constructor(private db: AngularFireDatabase) { 
    this.trips= this.db.list('Trips').valueChanges();
  }

  trips: Observable<any[]>;

  getTripsList() {
    return this.trips;
  }
}
