import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore } from './mock-classes/mock-store';
import { Store, StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { User } from './reducers/user.reducer';
import { Rank } from './enums/rank';
import { of } from 'rxjs';
import { selectUser } from './reducers/user.selector';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  
  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterModule.forRoot([]),
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: Store, useClass: MockStore},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize user$ observable', () => {
    const mockUser: User = {
      name: "Test User",
      rating: 800,
      rank: Rank.CHESS_MASTER,
      createdDate: new Date(),
      access: "admin"
    }

    mockStore.select.and.returnValue(of(mockUser));
    
    component.ngOnInit();

    component.user$?.subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    // expect(mockStore.select).toHaveBeenCalledWith(selectUser);//to-do pending
  });

  it('should set title to "profile"', () => {
    expect(component.title).toBe('profile');
  });
});
