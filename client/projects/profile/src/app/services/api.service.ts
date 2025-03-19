import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
    console.log("API Service constructor !");
    
  }

  public get(url: string, headers: object = {}) : Observable<any> {
    return this.http.get(url, headers);
  }

  public post(url: string, body: User,  headers: object = {}): Observable<any> {
    return this.http.post(url, body, headers);
  }

}
