import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable()
export class ApiServiceService {

  constructor(private http: HttpClient) {
    console.log("API Service constructor !");
    
  }

  public get(url: string, headers: object = {}) : Observable<any> {
    return this.http.get(url, headers);
  }

  public post(url: string, body: User,  headers: object = {}): Observable<any> {
    return this.http.post(url, body);
  }

}
