import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;

    component.chartData = [10, 20, 30];  // Make sure chartData is a valid array
    component.chartLables = ['Jan', 'Feb', 'Mar'];  // Mock labels for the chart
    component.chartColors = [  // Mock color values
      { red: 255, green: 0, blue: 0 }, 
      { red: 0, green: 255, blue: 0 }, 
      { red: 0, green: 0, blue: 255 }
    ];
    component.chartLabel = 'Sales';  // Add chart label
    component.chartType = 'bar';  // Optional: ensure chartType is set

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
