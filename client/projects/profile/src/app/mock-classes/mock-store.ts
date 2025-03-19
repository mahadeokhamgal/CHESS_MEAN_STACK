import { of } from 'rxjs';
import { User } from '../reducers/user.reducer';

export class MockStore {

  constructor() { }

  dispatch(action: any) {
    console.log('Mock dispatching action:', action);
  }

  select(selector: any) {
    console.log('Mock selecting state with selector:', selector);
    return of({
      name: "Test User",
      rating: 800,
      rank: 'CM',
      createdDate: new Date(),
      access: 'admin'
    } as User);
  }
}