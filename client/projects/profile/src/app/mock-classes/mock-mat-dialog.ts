import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-mock-mat-dialog',
  template: '',
})
export class MockMatDialog {
  open() {
    return {
      afterClosed: () => of(true)  // Simulate dialog close action returning an observable
    };
  }
}
