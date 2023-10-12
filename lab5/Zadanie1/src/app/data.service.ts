import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<JSON[]> {
    return this.httpClient.get<JSON[]>("https://jsonplaceholder.typicode.com/posts");
  }

  getPhotos(): Observable<JSON[]> {
    return this.httpClient.get<JSON[]>("https://jsonplaceholder.typicode.com/photos");
  }

  getPhoto(id: string): Observable<any> {
    return this.httpClient.get<JSON[]>("https://jsonplaceholder.typicode.com/photos/" + id);
  }
  
  sendNewPost(data: string): Observable<any> {
    return this.httpClient.post<any>("https://jsonplaceholder.typicode.com/posts", data, {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    });
  }
  
}
