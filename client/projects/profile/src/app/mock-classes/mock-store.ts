import { of } from 'rxjs';

export class MockStore {

  constructor() {}

  dispatch(action: any) {
    console.log('Mock dispatching action:', action);
  }

  select(selector: any) {
    console.log('Mock selecting state with selector:', selector);
    return of([]);
  }
}