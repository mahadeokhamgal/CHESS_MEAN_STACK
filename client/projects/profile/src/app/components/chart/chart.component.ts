import { Component, Input } from '@angular/core';
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
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.sass'
})
export class ChartComponent {
  @Input()
  public chart: any;
  @Input()
  public chartData!: number[];
  @Input()
  public chartLables!: string[];
  @Input()
  public chartColors!: any[];
  @Input()
  public chartType: string;
  @Input()
  public chartLabel!: string;

  constructor() {

    this.chartType = 'bar';
  }

  ngOnInit() {
    this.createChart();
  }

  createChart(): void {
    this.chart = new Chart('common-chart', {
      type: 'bar',
      data: {
        labels: this.chartLables,
        datasets: [
          {
            label: this.chartLabel,
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

  getChartBackgroundColors(size: number): string[] {
    return this.chartData.map((_, idx) => {
      let color = this.chartColors[idx % 7];
      return `rgba(${color.red}, ${color.blue}, ${color.green}, 0.2)`;
    })
  }

  getChartBorderColors(size: number): string[] {
    return this.chartData.map((_, idx) => {
      let color = this.chartColors[idx % 7];
      return `rgba(${color.red}, ${color.blue}, ${color.green})`;
    })
  }

  updateChartData(newData: number[]): void {
    this.chart.data.datasets[0].data = newData;
    this.chart.update();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
