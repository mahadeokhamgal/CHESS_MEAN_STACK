import { Component } from '@angular/core';
import { ChartData } from '../../model/chartModel';
import { GameRecord } from '../../model/gameRecord.model';
import { ArcElement, CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';

Chart.register(
  LineController,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
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
  chartData: ChartData[] = [];
  constructor() {

  }

  ngOnInit() {
    this.createChart();
  }

  createChart(): void {
    this.chart = new Chart('game-performance-chart', {
      type: 'line', // The type of chart (line, bar, pie, etc.)
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'], // X-axis labels
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55], // Data points for the chart
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
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