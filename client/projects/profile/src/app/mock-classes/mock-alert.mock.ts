import { Injectable } from '@angular/core';
import { MockSnackbar } from './mock-snackbar';

@Injectable({
  providedIn: 'root'
})
export class MockAlert {

  constructor(private snackBar: MockSnackbar) { }

  showSuccessMessage(message: string = 'Your action was successful!') {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  showErrorMessage(message: string = 'There was an error!') {
    this.snackBar.open(message, 'Close', {
      duration: 8000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
