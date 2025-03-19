import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockSnackbar {
  open(message: string, action: string, config: any): any {
    console.log(`Mock Snackbar: ${message}`); // Simulate the snackbar behavior
    return { afterDismissed: () => {} }; // Return an observable to mock behavior
  }
}
