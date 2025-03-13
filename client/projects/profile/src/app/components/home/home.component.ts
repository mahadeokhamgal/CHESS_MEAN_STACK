import { Component } from '@angular/core';
import { GamePerformanceComponent } from "../game-performance/game-performance.component";

@Component({
  selector: 'app-home',
  imports: [GamePerformanceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
