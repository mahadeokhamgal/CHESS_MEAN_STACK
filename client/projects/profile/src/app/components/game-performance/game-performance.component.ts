import { Component } from '@angular/core';
import { ChartComponent } from "../chart/chart.component";


@Component({
  selector: 'game-performance',
  imports: [ChartComponent],
  templateUrl: './game-performance.component.html',
  styleUrl: './game-performance.component.sass'
})
export class GamePerformanceComponent {
  public chartData: number[];
  public chartLables: string[];
  public chartColors : any[];
  constructor() {
    this.chartColors = [
      {"red":255, "blue": 99,"green": 132},
      {"red":255, "blue": 159,"green": 64},
      {"red":255, "blue": 205,"green": 86},
      {"red":75, "blue": 192,"green": 192},
      {"red":54, "blue": 162,"green": 235},
      {"red":153, "blue": 102,"green": 255},
      {"red":201, "blue": 203,"green": 207},
    ];
    this.chartData = [65, 59, 80, 92, 56, 55, 77, 21, 44, 23, 67, 78];
    this.chartLables = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septempber', 'October', 'November', 'December'];
  }
}