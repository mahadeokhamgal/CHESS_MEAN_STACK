import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiServiceService {

  constructor(private http: HttpClient) {
    console.log("API Service constructor !");
    
  }

  public get(url: string, headers: object = {}) : Observable<any> {
    return this.http.get(url, headers);
  }

}
