import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [{
        provide: MAT_DIALOG_DATA, useValue: {
          profileName: "Test Username",
          registeredDate: "1234567",
          isFriend: true,
        }
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject MAT_DIALOG_DATA correctly', () => {
    expect(component.data).toEqual({
      profileName: "Test Username",
      registeredDate: "1234567",
      isFriend: true,
    });  // Verify that the injected data matches
  });
});
