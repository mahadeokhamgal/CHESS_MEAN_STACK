import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePerformanceComponent } from './game-performance.component';

describe('GamePerformanceComponent', () => {
  let component: GamePerformanceComponent;
  let fixture: ComponentFixture<GamePerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
