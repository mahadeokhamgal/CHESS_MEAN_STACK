import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlertService } from '../../services/alerts.service';
import { MockStore } from '../../mock-classes/mock-store';
import { MockRouter } from '../../mock-classes/mock-router';
import { MockAlert } from '../../mock-classes/mock-alert.mock';
import { MockMatDialog } from '../../mock-classes/mock-mat-dialog';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterModule],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: MatDialog, useClass: MockMatDialog },
        { provide: Router, useClass: MockRouter },
        { provide: AlertService, useClass: MockAlert },
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: { get: () => 'mock-value' } } } 
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
