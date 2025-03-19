import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alerts.service';
import { Store } from '@ngrx/store';
import { MockApi } from '../../mock-classes/mock-api.mock';
import { MockAlert } from '../../mock-classes/mock-alert.mock';
import { MockRouter } from '../../mock-classes/mock-router';
import { MockStore } from '../../mock-classes/mock-store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: ApiService, useClass: MockApi},
        { provide: Router, useClass: MockRouter},
        { provide: AlertService, useClass: MockAlert},
        { provide: Store, useClass: MockStore},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
