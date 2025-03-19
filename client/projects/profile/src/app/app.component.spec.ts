import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore } from './mock-classes/mock-store';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: Store, useClass: MockStore},
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'profile' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('profile');
  });
});
