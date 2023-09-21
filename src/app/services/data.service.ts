import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) { }

  // Get Books information
  getAuthorInformation(): Observable<any> {
    return this.httpClient.get('https://s3.amazonaws.com/api-fun/books.json');
  }
}
