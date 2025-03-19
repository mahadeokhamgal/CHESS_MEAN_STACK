import { Component } from "@angular/core";

@Component({
  selector: 'app-mock-snackbar',
  template: ''
})
export class MockSnackbar {
  open(message: string, action: string, config: any): any {
    console.log(`Mock Snackbar: ${message}`); // Simulate the snackbar behavior
    return { afterDismissed: () => {} }; // Return an observable to mock behavior
  }
}
