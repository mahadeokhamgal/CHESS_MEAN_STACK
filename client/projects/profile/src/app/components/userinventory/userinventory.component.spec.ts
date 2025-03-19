import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinventoryComponent } from './userinventory.component';
import { ApiService } from '../../services/api.service';
import { AlertService } from '../../services/alerts.service';
import { MockAlert } from '../../mock-classes/mock-alert.mock';
import { MockApi } from '../../mock-classes/mock-api.mock';

describe('UserinventoryComponent', () => {
  let component: UserinventoryComponent;
  let fixture: ComponentFixture<UserinventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserinventoryComponent],
      providers: [
        { provide: ApiService, useClass: MockApi },
        { provide: AlertService, useClass: MockAlert },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
