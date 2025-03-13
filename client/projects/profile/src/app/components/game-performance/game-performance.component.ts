import { Component } from '@angular/core';
import { ChartData } from '../../model/chartModel';
import { GameRecord } from '../../model/gameRecord.model';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';

Chart.register(
  LineController,
  BarController,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  ArcElement
);

@Component({
  selector: 'game-performance',
  imports: [],
  templateUrl: './game-performance.component.html',
  styleUrl: './game-performance.component.sass'
})
export class GamePerformanceComponent {
  public chart: any;
  public chartData: number[];
  public chartLables: string[];
  chartColors : any[];
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
    this.chartData = [65, 59, 80, 81, 56, 55];
    this.chartLables = ['January', 'February', 'March', 'April', 'May', 'June'];
  }

  ngOnInit() {
    this.createChart();
  }

  getChartBackgroundColors(size: number) : string[] {
    return this.chartColors.slice(0, size).map(color => {
      return `rgba(${color.red}, ${color.blue}, ${color.green}, 0.2)`;
    })
  }

  getChartBorderColors(size: number) : string[] {
    return this.chartColors.slice(0, size).map(color => {
      return `rgba(${color.red}, ${color.blue}, ${color.green})`;
    })
  }

  createChart(): void {
    this.chart = new Chart('game-performance-chart', {
      type: 'bar',
      data: {
        labels: this.chartLables,
        datasets: [
          {
            label: 'My First Dataset',
            data: this.chartData,
            borderWidth: 1,
            backgroundColor: this.getChartBackgroundColors(this.chartData.length),
            borderColor: this.getChartBorderColors(this.chartData.length)
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  updateChartData(newData: number[]): void {
    this.chart.data.datasets[0].data = newData;
    this.chart.update();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Clean up chart on component destruction
    }
  }
}

export const renderBarChart = (containerId: string, performanceData: ChartData[]) => {

}