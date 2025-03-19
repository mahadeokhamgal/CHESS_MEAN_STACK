import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../reducers/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class MockApi {

  constructor() {

  }

  public get(url: string, headers: object = {}): Observable<any> {
    return of({});
  }

  public post(url: string, body: User, headers: object = {}): Observable<any> {
    return of({});
  }
}
