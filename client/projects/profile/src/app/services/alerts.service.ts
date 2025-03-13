import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor(private snackBar: MatSnackBar) { }

  showSuccessMessage(message: string = 'Your action was successful!') {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // 3 seconds
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
