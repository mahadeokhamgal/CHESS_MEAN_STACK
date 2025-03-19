import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alerts.service';
import { MockApi } from '../../mock-classes/mock-api.mock';
import { MockAlert } from '../../mock-classes/mock-alert.mock';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: ApiService, useClass: MockApi },
        { provide: Router, useValue: {} },  // You can use a mock or a simple empty object
        { provide: AlertService, useClass: MockAlert }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
