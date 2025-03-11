import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinventoryComponent } from './userinventory.component';

describe('UserinventoryComponent', () => {
  let component: UserinventoryComponent;
  let fixture: ComponentFixture<UserinventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserinventoryComponent]
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
