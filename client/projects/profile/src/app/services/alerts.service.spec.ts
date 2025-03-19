import { TestBed } from '@angular/core/testing';

import { AlertService } from './alerts.service';
import { MockSnackbar } from '../mock-classes/mock-snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: []
    });
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
